resource "google_cloudbuild_trigger" "build-trigger" {
  ignored_files = [".gitignore"]

  //Configuration section
  // build config file
  filename = "cloudbuild/feature-build.yaml"
}
