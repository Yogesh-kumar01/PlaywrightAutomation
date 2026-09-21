pipeline {
    agent any

    environment {
        PATH = "C:\\Users\\victus\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin;${env.PATH}"
    }

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
                bat 'if exist allure-results rmdir /s /q allure-results'
                bat 'mkdir allure-results'
                bat 'docker run --rm -v "%WORKSPACE%\\allure-results:/app/allure-results" playwright-tests'
            }
        }
    }

    post {
        always {
            echo 'Jenkins pipeline execution completed.'
        }
    }
}