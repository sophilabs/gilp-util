const fs = require('fs');
const execSync = require('child_process').execSync;
const gilpUtil = require('../lib');

const currentDirectory = process.cwd();

describe('Gilp Util module', function () {
  afterAll(function () {
    // clean .git folder
    execSync(`rm ${gilpUtil.getGitDirectory()}/COMMIT_EDITMSG`);
  });
  it('gilpUtil.getBaseDirectory', () => {
    const baseDirectory = gilpUtil.getBaseDirectory();
    expect(baseDirectory).toEqual(currentDirectory);
  });
  it('gilpUtil.getGitDirectory', () => {
    const gitDirectory = gilpUtil.getGitDirectory();
    const expectedGitDirectory = `${currentDirectory}/.git`;

    expect(expectedGitDirectory).toEqual(gitDirectory);
  });
  it('gilpUtil.getBranchName', () => {
    const branchName = gilpUtil.getBranchName();
    const gitHeadPath = `${currentDirectory}/.git/HEAD`;
    const expectedBranchName = fs.readFileSync(
      gitHeadPath,
      'utf-8'
    ).replace('ref: refs/heads/', '').trim();

    expect(expectedBranchName).toEqual(branchName);
  });
  it('gilpUtil.getCommitMessage', () => {
    // mock COMMIT_EDITMSG
    const expectedCommitMessage = 'Some commit message';
    fs.appendFileSync(`${gilpUtil.getGitDirectory()}/COMMIT_EDITMSG`, expectedCommitMessage);
    const commitMessage = gilpUtil.getCommitMessage();

    expect(expectedCommitMessage).toEqual(commitMessage);
  });
  it('gilpUtil.getBranch (test warning message)', () => {
    jest.spyOn(global.console, 'warn');
    gilpUtil.getBranch();
    expect(console.warn).toBeCalledWith('gilpUtil.getBranch will be removed in favor of gilpUtil.getBranchName.');
  });
  it('gilpUtil.getArgs', () => {
    const args = gilpUtil.getArgs();
    expect(args._).toHaveLength(0);
  });
});
