node {
    def git = checkout scm

        stage("clean") {
            sh 'git clean -dfxq'
            sh 'git stash'
        }

        stage("setup") {
            npm install eslint --save-dev
        }

        stage("Build") {
            sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
            sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
        }

}
