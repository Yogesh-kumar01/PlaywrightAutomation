pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'clean-main',
                    url: 'https://github.com/Yogesh-kumar01/PlaywrightAutomation.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t playwright-tests .'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'docker run --rm playwright-tests'
            }
        }
    }

    post {
        always {
            echo 'Jenkins pipeline execution completed.'
        }
    }
}