pipeline {
    agent any

    environment {
     
        ENV_EXPRESS = credentials('express-env')
        ENV_NEST = credentials('nest-env')
        VITE_API_EXPRESS = 'http://localhost:3000/'
        VITE_API_NESTJS = 'http://localhost:3001/'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out the code from repository...'
                git branch: 'main', url: 'https://github.com/GentraAW/express-nest-crud'
            }
        }

        stage('Prepare .env Files') {
            steps {
                script {
                    
                    writeFile file: 'express-service/.env', text: "${ENV_EXPRESS}"
                    echo 'Created .env file for Express'

                  
                    writeFile file: 'nest-service/.env', text: "${ENV_NEST}"
                    echo 'Created .env file for NestJS'
                }
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Install BE-Express') {
                    steps {
                        dir('express-service') {
                            bat 'npm ci'
                        }
                    }
                }

                stage('Install BE-NestJS') {
                    steps {
                        dir('nest-service') {
                            bat 'npm ci'
                        }
                    }
                }

                stage('Install FE-React') {
                    steps {
                        dir('react-project') {
                            bat 'npm ci'
                        }
                    }
                }
            }
        }

        stage('Start Applications') {
            parallel {
                stage('Start BE-Express') {
                    steps {
                        dir('express-service') {
                            bat 'npm start'
                        }
                    }
                }

                stage('Start BE-NestJS') {
                    steps {
                        dir('nest-service') {
                            bat 'npm run start:dev'
                        }
                    }
                }

                stage('Start FE-React') {
                    steps {
                        dir('react-js') {
                            bat 'npm run dev'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished. Cleaning up...'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
    }
}