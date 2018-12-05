node {
    def git = checkout scm

        stage("clean") {
            git clean -dfxq
            git stash
        }
        stage("Build") {
            sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
            sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
        }

}
