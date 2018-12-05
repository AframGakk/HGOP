node {
    def git = checkout scm
    stages {
        stage("clean") {
            git clean -dfxq
            git stash
        }
        stage("Build") {
            sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
            sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
        }
    }
}
