node {
    def git = checkout scm

        stage("commit") {
            step("clean") {
                sh 'git clean -dfxq'
                sh 'git stash'
            }

            step("setup") {
                dir("setup") {
                    sh 'npm install eslint --save-dev'
                    sh 'npm install eslint-config-google --save-dev'
                    sh 'npm install jest --save-dev'
                }
            }

            step("lint") {
                dir("game-api") {
                    sh 'npm run eslint'
                }
            }

            step("test") {
                dir("game-api") {
                    sh 'npm run test:unit'
                }
            }
        }

        stage("Build") {
            step("build") {
                sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
                sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
            }

        }

}
