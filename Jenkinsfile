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
            step([
                $class: 'CloverPublisher',
                cloverReportDir: 'coverage',
                cloverReportFileName: 'clover.xml',
                healthyTarget: [methodCoverage: 80, conditionalCoverage: 80, statementCoverage: 80],
                unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
                failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
            ])
        }

        stage("Build") {
            sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
            sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
        }

        build job: 'Api-Test', parameters: [[$class: 'StringParameterValue', name: 'API_URL', value: "http://localhost:3000 && npm run test:api"], [$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "{git.GIT_COMMIT}"]]
        build job: 'Capacity-Test', parameters: [[$class: 'StringParameterValue', name: 'API_URL', value: "http://localhost:3000 && npm run test:capacity"], [$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "{git.GIT_COMMIT}"]]
        build job: 'Deployment', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]

}
