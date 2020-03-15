# GitHub Action to create Commit Status

This simple action uses octokit to create a commit status:
https://octokit.github.io/rest.js/v17#repos-create-status

Useful when you want your CD workflow to report back the deployed URL to GitHub.

## Usage

```yaml
- name: Set deployment status
  uses: pbrandone/create-status-action@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    state: success
    description: Deploy ready!
    url: https://someurl.com/
```

### Inputs

| Name        | Required | Description                                                                         |
| ----------- | -------- | ----------------------------------------------------------------------------------- |
| token       | Yes      | GitHub Token                                                                        |
| state       | Yes      | The state of the status. Can be one of `error`, `failure`, `pending`, or `success`. |
| url         | No       | The target URL to associate with this status.                                       |
| description | No       | A short description of the status.                                                  |
| context     | No       | A string label to differentiate this status from the status of other systems.       |

Check GitHub's documentation [here](https://developer.github.com/v3/repos/statuses/#create-a-status)

## License

This project is distributed under the [MIT license](LICENSE.md).
