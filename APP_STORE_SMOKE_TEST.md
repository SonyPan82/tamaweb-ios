# Tamaweb App Store Smoke Test

Run this checklist on a recent iPhone simulator and, ideally, on one real iPhone before upload.

## 1. First Launch

- Install the app from Xcode.
- Confirm the app launches without black screen, JS crash, or stuck loader.
- Confirm the Tamaweb title screen and main shell render correctly on iPhone portrait.

## 2. Save Creation

- Start a fresh profile.
- Set a username.
- Force-close and reopen the app.
- Confirm the pet, settings, and progress are still present.

## 3. Language

- Open `Settings > System settings > Language`.
- Switch to French.
- Confirm the app reloads and key settings screens display in French.
- Switch back to English.

## 4. Audio

- Confirm sound effects play.
- Confirm background music can be toggled on/off.
- Confirm no audio-related crash happens after backgrounding and reopening the app.

## 5. Notifications

- Open iOS notification setting flow from the app.
- Accept notifications.
- Enable in-game notification toggles.
- Trigger at least one local notification scenario and confirm it appears.
- Disable notifications and confirm the toggle state updates correctly.

## 6. Online Features

- Open the online hub.
- Confirm remote pets load successfully.
- Confirm friend-related flows open without error.
- Test friend code export and friend code import.

## 7. Settings and Reset

- Test save export.
- Test save import with a valid code.
- Test `reset pet data`.
- Test `factory reset` only if you are on a disposable test profile.

## 8. Background / Resume

- Send the app to background for at least 30 seconds.
- Reopen it.
- Confirm no broken UI, frozen inputs, or duplicate overlays appear.

## 9. Small UX Pass

- Check the bottom-left native iOS back behavior in nested settings flows.
- Check that text is readable in the shell UI.
- Check that no obvious English leftovers remain in the main French flows you want to ship.

## 10. Release Sanity

- Build Release configuration.
- Confirm the app name shows as `Tamaweb`.
- Confirm bundle id is the final App Store one.
- Confirm no debug/test buttons are visible.
- Confirm no sensitive logs or codes are printed during normal use.

## App Privacy Answers

Current recommended App Store Connect answers:

- Data collected: `Yes`
- Tracking: `No`
- Data types:
  - `User ID` -> linked to user: `Yes`, used for tracking: `No`, purpose: `App Functionality`
  - `Other User Content` -> linked to user: `Yes`, used for tracking: `No`, purpose: `App Functionality`

