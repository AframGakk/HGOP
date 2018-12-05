node {
    def git = checkout scm

        stage("clean") {
            sh 'git clean -dfxq'
            sh 'git stash'
        }

        stage("setup") {
          dir("game-api") {
            sh 'npm install eslint --save-dev'
            sh 'npm install eslint-config-google --save-dev'
          }
        }

        stage("eslint") {
            dir("game-api") {
                sh 'npm run eslint'
            }
        }

        stage("Build") {
            sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
            sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
        }

}
