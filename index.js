const core = require("@actions/core");
const github = require("@actions/github");

const acceptedStates = ["error", "failure", "pending", "success"];

async function run() {
  try {
    const token = core.getInput("token", { required: true });
    const state = core.getInput("state", { required: true });
    const url = core.getInput("url");
    const description = core.getInput("description");
    const context = core.getInput("context");

    if (acceptedStates.indexOf(state) === -1) {
      throw new Error(
        `Invalid status provided. Must be one of ${acceptedStates.join(", ")}`
      );
    }

    const status = {
      ...github.context.repo,
      sha: github.context.sha,
      state
    };

    const optional = [
      { value: url, key: "target_url" },
      { value: description, key: "description" },
      { value: context, key: "context" }
    ];

    console.log("github context", JSON.stringify(github.context));

    optional.forEach(value => {
      if (value.value) {
        status[value.key] = value.value;
      }
    });

    const octokit = new github.GitHub(token);
    await octokit.repos.createStatus(status);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
