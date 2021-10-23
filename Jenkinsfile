pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh "docker build -t denoApp ."
                }
            }
        
        stage('run') {
            steps {
                sh "docker run -dp 7700:7700 denoApp"
            }
        }
    }
}