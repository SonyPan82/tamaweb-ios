import UIKit
import Capacitor
import WebKit
import UserNotifications

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, WKScriptMessageHandler {

    var window: UIWindow?
    private let nativeNotificationHandlerName = "tamaNativeNotifications"
    private let notificationCenter = UNUserNotificationCenter.current()
    private var hasInstalledNativeNotificationBridge = false

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        DispatchQueue.main.async {
            self.installNativeNotificationBridgeIfPossible()
        }
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
        installNativeNotificationBridgeIfPossible()
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return false
    }

    private func installNativeNotificationBridgeIfPossible() {
        guard let bridgeViewController = rootBridgeViewController(),
              let webView = bridgeViewController.webView else {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
                self.installNativeNotificationBridgeIfPossible()
            }
            return
        }

        let userContentController = webView.configuration.userContentController

        if !hasInstalledNativeNotificationBridge {
            userContentController.removeScriptMessageHandler(forName: nativeNotificationHandlerName)
            userContentController.add(self, name: nativeNotificationHandlerName)
            hasInstalledNativeNotificationBridge = true
        }

        webView.evaluateJavaScript(nativeNotificationsBridgeScript(), completionHandler: nil)
    }

    private func rootBridgeViewController() -> CAPBridgeViewController? {
        if let bridgeViewController = window?.rootViewController as? CAPBridgeViewController {
            return bridgeViewController
        }

        if let navigationController = window?.rootViewController as? UINavigationController {
            return navigationController.viewControllers.first as? CAPBridgeViewController
        }

        let keyWindow = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap(\.windows)
            .first(where: \.isKeyWindow)

        if let bridgeViewController = keyWindow?.rootViewController as? CAPBridgeViewController {
            return bridgeViewController
        }

        if let navigationController = keyWindow?.rootViewController as? UINavigationController {
            return navigationController.viewControllers.first as? CAPBridgeViewController
        }

        return nil
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == nativeNotificationHandlerName else {
            return
        }

        guard
            let body = message.body as? [String: Any],
            let action = body["action"] as? String,
            let requestId = body["requestId"] as? Int
        else {
            return
        }

        let payload = body["payload"] as? [String: Any] ?? [:]

        switch action {
        case "checkPermissions":
            resolvePermission(for: requestId)
        case "requestPermissions":
            requestPermission(for: requestId)
        case "cancel":
            cancelNotifications(payload: payload, requestId: requestId)
        case "removeAllDeliveredNotifications":
            notificationCenter.removeAllDeliveredNotifications()
            resolve(requestId: requestId, payload: ["ok": true])
        case "schedule":
            scheduleNotifications(payload: payload, requestId: requestId)
        default:
            reject(requestId: requestId, message: "Unknown action: \(action)")
        }
    }

    private func nativeNotificationsBridgeScript() -> String {
        let script = """
        (function() {
            if (window.TamaNativeNotifications) {
                return;
            }

            const handler = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers["__TAMA_HANDLER__"];
            if (!handler) {
                return;
            }

            let nextRequestId = 1;
            const pending = {};

            const invoke = (action, payload) => new Promise((resolve, reject) => {
                const requestId = nextRequestId++;
                pending[requestId] = { resolve, reject };
                handler.postMessage({
                    action,
                    requestId,
                    payload: payload || {}
                });
            });

            const normalizeNotifications = (notifications) => {
                if (!Array.isArray(notifications)) {
                    return [];
                }

                return notifications
                    .map((notification) => {
                        const at = notification && notification.schedule ? notification.schedule.at : null;
                        const timestamp = at instanceof Date
                            ? at.getTime()
                            : Number(new Date(at).getTime());

                        return {
                            id: Number(notification && notification.id) || 0,
                            title: String((notification && notification.title) || ''),
                            body: String((notification && notification.body) || ''),
                            threadIdentifier: notification && notification.threadIdentifier
                                ? String(notification.threadIdentifier)
                                : '',
                            at: Number.isFinite(timestamp) ? timestamp : 0
                        };
                    })
                    .filter((notification) => notification.id > 0 && notification.at > 0);
            };

            const api = {
                checkPermissions() {
                    return invoke('checkPermissions');
                },
                requestPermissions() {
                    return invoke('requestPermissions');
                },
                cancel(options) {
                    const notifications = Array.isArray(options && options.notifications)
                        ? options.notifications.map((notification) => ({
                            id: Number(notification && notification.id) || 0
                        })).filter((notification) => notification.id > 0)
                        : [];
                    return invoke('cancel', { notifications });
                },
                removeAllDeliveredNotifications() {
                    return invoke('removeAllDeliveredNotifications');
                },
                schedule(options) {
                    return invoke('schedule', {
                        notifications: normalizeNotifications(options && options.notifications)
                    });
                },
                _resolve(requestId, payload) {
                    const callback = pending[requestId];
                    if (!callback) {
                        return;
                    }
                    delete pending[requestId];
                    callback.resolve(payload);
                },
                _reject(requestId, message) {
                    const callback = pending[requestId];
                    if (!callback) {
                        return;
                    }
                    delete pending[requestId];
                    callback.reject(new Error(message || 'Native notification bridge error'));
                }
            };

            window.TamaNativeNotifications = api;
            window.tamaNativeNotifications = api;
        })();
        """
        return script.replacingOccurrences(of: "__TAMA_HANDLER__", with: nativeNotificationHandlerName)
    }

    private func resolvePermission(for requestId: Int) {
        notificationCenter.getNotificationSettings { settings in
            self.resolve(requestId: requestId, payload: [
                "display": self.authorizationDisplayValue(for: settings.authorizationStatus)
            ])
        }
    }

    private func requestPermission(for requestId: Int) {
        notificationCenter.requestAuthorization(options: [.alert, .badge, .sound]) { _, error in
            if let error = error {
                self.reject(requestId: requestId, message: error.localizedDescription)
                return
            }

            self.resolvePermission(for: requestId)
        }
    }

    private func cancelNotifications(payload: [String: Any], requestId: Int) {
        let notificationDictionaries = payload["notifications"] as? [[String: Any]] ?? []
        let identifiers: [String] = notificationDictionaries.compactMap { (dictionary: [String: Any]) -> String? in
            guard let id = dictionary["id"] as? Int else {
                return nil
            }
            return notificationIdentifier(for: id)
        }

        notificationCenter.removePendingNotificationRequests(withIdentifiers: identifiers)
        notificationCenter.removeDeliveredNotifications(withIdentifiers: identifiers)
        resolve(requestId: requestId, payload: ["ok": true])
    }

    private func scheduleNotifications(payload: [String: Any], requestId: Int) {
        let notificationDictionaries = payload["notifications"] as? [[String: Any]] ?? []
        let requests: [UNNotificationRequest] = notificationDictionaries.compactMap { dictionary in
            buildNotificationRequest(from: dictionary)
        }

        if requests.isEmpty {
            resolve(requestId: requestId, payload: ["scheduled": 0])
            return
        }

        notificationCenter.removePendingNotificationRequests(withIdentifiers: requests.map(\.identifier))

        let group = DispatchGroup()
        var firstError: Error?

        for request in requests {
            group.enter()
            notificationCenter.add(request) { error in
                if firstError == nil, let error = error {
                    firstError = error
                }
                group.leave()
            }
        }

        group.notify(queue: .main) {
            if let error = firstError {
                self.reject(requestId: requestId, message: error.localizedDescription)
                return
            }

            self.resolve(requestId: requestId, payload: ["scheduled": requests.count])
        }
    }

    private func buildNotificationRequest(from dictionary: [String: Any]) -> UNNotificationRequest? {
        guard
            let id = dictionary["id"] as? Int,
            let title = dictionary["title"] as? String,
            let body = dictionary["body"] as? String,
            let timestamp = dictionary["at"] as? Double
        else {
            return nil
        }

        let fireDate = Date(timeIntervalSince1970: timestamp / 1000)
        let timeInterval = fireDate.timeIntervalSinceNow
        guard timeInterval > 0 else {
            return nil
        }

        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        content.sound = .default
        if let threadIdentifier = dictionary["threadIdentifier"] as? String {
            content.threadIdentifier = threadIdentifier
        }

        let trigger = UNTimeIntervalNotificationTrigger(
            timeInterval: max(1, timeInterval),
            repeats: false
        )

        return UNNotificationRequest(
            identifier: notificationIdentifier(for: id),
            content: content,
            trigger: trigger
        )
    }

    private func authorizationDisplayValue(for status: UNAuthorizationStatus) -> String {
        switch status {
        case .authorized, .provisional, .ephemeral:
            return "granted"
        case .denied:
            return "denied"
        case .notDetermined:
            return "prompt"
        @unknown default:
            return "prompt"
        }
    }

    private func notificationIdentifier(for id: Int) -> String {
        return "tamaweb.notification.\(id)"
    }

    private func resolve(requestId: Int, payload: [String: Any]) {
        sendCallback(function: "_resolve", requestId: requestId, payload: payload)
    }

    private func reject(requestId: Int, message: String) {
        let escapedMessage = jsEscapedString(message)
        DispatchQueue.main.async {
            self.rootBridgeViewController()?.webView?.evaluateJavaScript("window.TamaNativeNotifications && window.TamaNativeNotifications._reject(\(requestId), \"\(escapedMessage)\");", completionHandler: nil)
        }
    }

    private func sendCallback(function: String, requestId: Int, payload: [String: Any]) {
        guard
            let jsonData = try? JSONSerialization.data(withJSONObject: payload, options: []),
            let jsonString = String(data: jsonData, encoding: .utf8)
        else {
            reject(requestId: requestId, message: "Unable to encode native response")
            return
        }

        DispatchQueue.main.async {
            self.rootBridgeViewController()?.webView?.evaluateJavaScript("window.TamaNativeNotifications && window.TamaNativeNotifications.\(function)(\(requestId), \(jsonString));", completionHandler: nil)
        }
    }

    private func jsEscapedString(_ string: String) -> String {
        var escaped = string.replacingOccurrences(of: "\\", with: "\\\\")
        escaped = escaped.replacingOccurrences(of: "\"", with: "\\\"")
        escaped = escaped.replacingOccurrences(of: "\n", with: "\\n")
        escaped = escaped.replacingOccurrences(of: "\r", with: "\\r")
        return escaped
    }
}
