pipeline {  
    agent any  

    environment {  
        VITE_API_EXPRESS = 'http://localhost:3000/'  
        VITE_API_NESTJS = 'http://localhost:3001/'  
    }  

    stages {  
        stage('Checkout Code') {  
            steps {  
                echo 'Checking out the code from repository...'  
                checkout scm  
            }  
        }  

        stage('Prepare Environment') {  
            steps {  
                script {  
                    withCredentials([  
                        file(credentialsId: 'express-env', variable: 'EXPRESS_ENV_FILE'),  
                        file(credentialsId: 'nest-env', variable: 'NEST_ENV_FILE')  
                    ]) {  
                        sh 'cp $EXPRESS_ENV_FILE express-service/.env'  
                        sh 'cp $NEST_ENV_FILE nest-service/.env'  
                    }  
                }  
            }  
        }  

        stage('Install Dependencies') {  
            parallel {  
                stage('Install BE-Express') {  
                    steps {  
                        dir('express-service') {  
                            sh 'npm ci'  
                        }  
                    }  
                }  

                stage('Install BE-NestJS') {  
                    steps {  
                        dir('nest-service') {  
                            sh 'npm ci'  
                        }  
                    }  
                }  

                stage('Install FE-React') {  
                    steps {  
                        dir('react-js') {  
                            sh 'npm ci'  
                        }  
                    }  
                }  
            }  
        }  

        stage('Run Unit Tests') {  
            parallel {  
                stage('Test BE-Express') {  
                    steps {  
                        dir('express-service') {  
                            sh 'npm test'  
                        }  
                    }  
                }  

                stage('Test BE-NestJS') {  
                    steps {  
                        dir('nest-service') {  
                            sh 'npm test'  
                        }  
                    }  
                }  

                stage('Test FE-React') {  
                    steps {  
                        dir('react-js') {  
                            sh 'npm test'  
                        }  
                    }  
                }  
            }  
        }  

        stage('Build Applications') {  
            parallel {  
                stage('Build BE-Express') {  
                    steps {  
                        dir('express-service') {  
                            sh 'npm run build'  
                        }  
                    }  
                }  

                stage('Build BE-NestJS') {  
                    steps {  
                        dir('nest-service') {  
                            sh 'npm run build'  
                        }  
                    }  
                }  

                stage('Build FE-React') {  
                    steps {  
                        dir('react-js') {  
                            sh 'npm run build'  
                        }  
                    }  
                }  
            }  
        }  

        stage('Deploy to Staging') {  
            steps {  
                echo 'Deploying to Staging environment...'  
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