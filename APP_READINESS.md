# App readiness audit — November 2026

Scope: the 10 Flutter apps in `~/`. (`voice-tell-lab` is a Python CLI and
`web-apps` is a set of browser pages; neither is an app-store binary.)

## Verified by real execution

| Check | Result |
|---|---|
| `flutter test` | 10 / 10 apps, all tests pass |
| `flutter analyze` | No errors in any app; remaining items are lint-level |
| `flutter build apk --release` | 10 / 10 succeeded |
| APK in `dist/` with matching version | 10 / 10, verified with `aapt2 dump badging` |
| Store listing copy present | 10 / 10 (`STORE_LISTING.md`) |

Latest release APKs by app:

- `agate-app/dist/agate-lens-v0.2.1.apk` (v0.2.1)
- `earnstack-app/dist/earnstack-v0.3.0.apk` (v0.3.0)
- `evergreen-point-app/dist/evergreen-point-v1.0.0.apk`
- `fungi_field_app/dist/fungi-field-v1.1.0.apk`
- `kidcode-app/dist/kidcode-v1.1.0.apk`
- `passcache-app/dist/passcache-v1.0.1.apk`
- `ship-canal-app/dist/ship-canal-v1.0.0.apk`
- `story-mixer-app/dist/story-mixer-v1.0.0.apk`
- `tacoma-narrows-app/dist/tacoma-narrows-v1.0.0.apk`
- `tell_lab_app/dist/tell-lab-v1.0.0.apk`

## Bugs fixed during this pass

1. **Kid Code Studio — real UI bug.** `CourseBuilderScreen._registerBuild()`
   waited for a disk write before calling `onBuildChanged`, so the parent (and
   the user) saw no saved build when storage was slow. The callback now fires
   immediately; persistence happens after. Test `course builder registers a
   saved build` now passes.
2. **Kid Code Studio — corrupted build cache.** A zero-byte native-assets
   `output.json` in `.dart_tool/hooks_runner` broke `flutter test`. Cleared and
   regenerated with `flutter pub get`.
3. **EarnStack version mismatch.** Code was `0.1.0+1` while releases were named
   `0.3.0`. Bumped to `0.3.0+1` and rebuilt; store data now matches.
4. **Unused imports** removed from the four bridge apps' widget tests and from
   Kid Code Studio's `main.dart` (5 real analyzer warnings).
5. **Store listings** generated for nine apps from the same product data the
   storefront uses. Agate Lens keeps its original hand-written listing.
6. **Kid Code Studio v1.1.0 — new Free Build mode.** A seventh course where any
   of the 100 scenes can be picked directly instead of walked in order, plus
   skip/swap as before. The course builder also now renders immediately rather
   than gating its first frame on a storage read. New test covers the picker;
   15/15 tests pass.

## Device smoke test — 20 Nov 2026

Paired over wireless ADB to the Samsung SM S166V (192.168.12.131:44287).
All 10 store apps were installed from the fresh release APKs and launched;
every one came to the foreground and rendered its main screen with no crash or
blank UI (verified by foreground activity plus screenshots). The new Kid Code
Studio Free Build flow was exercised end to end on the handset: opened the
Free Build builder, tapped "Add any scene", picked scene 1 from the dialog, and
confirmed the scene rendered and saved. The test build was then cleared with
`pm clear`, and `svc power stayon false` restored.

One real release bug was caught only on the device: bumping Kid Code Studio to
1.1.0+1 reset the Android versionCode to 1, so `adb install -r` failed with
INSTALL_FAILED_VERSION_DOWNGRADE against the installed +22. Fixed to 1.1.0+23,
rebuilt, reinstalled successfully.

## Known, non-blocking items

- Flutter 3.50 deprecates `package:flutter/material.dart` in favour of
  `material_ui`. This is an `info` lint across several apps, not a build or
  runtime failure. Migrating all apps is a separate, deliberate refactor.
- A few `unnecessary_const` / `curly_braces` infos remain in Fungi Field and
  Tell Lab. Cosmetic only.
- Release APKs are built but not all are signed with a Play upload key. AAB +
  signing setup is required when each app is actually submitted to Play.
- Device smoke test is now done (see above). Re-run it after any future code
  change before the next Play submission.

## Selling readiness

All 12 store listings have confirmed modest prices (free tools $0; bridge apps
and Story Mixer $0.99; EarnStack $1.99; Fungi Field and Kid Code
Studio $2.99; Agate Lens Pro $4.99; kits $59/$99/$149). Checkout URLs are still
empty by design — see `SELLING_SETUP.md`. Exception: the free Agate Lens APK
has a real download link to the published GitHub release, verified live.
