# Upload FleetConnect

This action upload artifact to FleetConnect as a package version that can be deployed by [package creation](https://demo04.squareone.bsquare.com/docs/using-squareone/packages/package-creation/) and output the package version ID.

A new package is created for the version if it doesn't exist.

## Usage

### `workflow.yml` Example

Place in a `.yml` file such as this one in your `.github/workflows` folder. [Refer to the documentation on workflow YAML syntax here.](https://help.github.com/en/articles/workflow-syntax-for-github-actions)

```yaml
name: Upload to FleetConnect

on: [pull_request]

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: benjamint-bsquare/upload-fleetconnect-action@master
        with:
          fleetconnect_client_id: ${{ secrets.FLEETCONNECT_CLIENT_ID }}
          fleetconnect_client_secret: ${{ secrets.FLEETCONNECT_CLIENT_SECRET}}
          fleetconnect_token_endpoint: ${{ secrets.FLEETCONNECT_TOKEN_ENDPOINT}}
          source_dir: 'dirname'
```

Recommend using with [deployment-action](https://github.com/marketplace/actions/deployment-action) in pull request.

```yaml
name: Upload Deployment to FleetConnect

on: [pull_request]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: chrnorm/deployment-action@releases/v1
        name: Create GitHub Deployment
        id: test
        with:
          token: ${{ secrets.GITHUB_TOKEN}}
          description: 'Preview for deployment'
          environment: preview

      - uses: benjamint-bsquare/upload-fleetconnect-action@master
        name: FleetConnect Upload
        id: FleetConnect
        with:
          fleetconnect_client_id: ${{ secrets.FLEETCONNECT_CLIENT_ID }}
          fleetconnect_client_secret: ${{ secrets.FLEETCONNECT_CLIENT_SECRET}}
          fleetconnect_token_endpoint: ${{ secrets.FLEETCONNECT_TOKEN_ENDPOINT}}
          source_dir: 'myApp'
```

## Action inputs

The following settings must be passed as environment variables as shown in the example. Sensitive information, especially `fleetconnect_client_id` and `fleetconnect_client_secret`, should be [set as encrypted secrets](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) — otherwise, they'll be public to anyone browsing your repository's source code

| name                          | description                                                                                                                                                         |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fleetconnect_client_id`      | (Required) Your Client ID. [More info here.](https://demo04.squareone.bsquare.com/docs/using-squareone/api/api-user-guide/#security-credentials-tokens-and-headers) |
| `fleetconnect_client_secret`  | (Required) Your Client Secret.                                                                                                                                      |
| `fleetconnect_token_endpoint` | (Required) Your Token Endpoint.                                                                                                                                     |
| `source_dir`                  | (Required) The local directory (or file) you wish to upload. Directories are uploaded as FleetConnect Tar Package files                                             |
| `package_category`            | (Optional) Default "artifact"                                                                                                                                       |
| `package_description`         | (Optional)                                                                                                                                                          |
| `package_name`                | (Required)                                                                                                                                                          |

## Action outputs

| name                 | description                     |
|----------------------|---------------------------------|
| `package_id`         | The created packages ID         |
| `package_version_id` | The created package versions ID |