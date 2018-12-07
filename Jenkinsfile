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
                sh 'npm install jest --save-dev'
            }

        }

        stage("lint") {
            dir("game-api") {
                sh 'npm run eslint'
            }
        }

        stage("test") {
            dir("game-api") {
                sh 'npm run test:unit'
            }
        }

        stage("Build") {
            sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
            sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
        }

        stage("Deploy") {
            sh "./scripts/deploy.sh"
        }

        build job: 'AframGakk/HGOP/master', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]

}
