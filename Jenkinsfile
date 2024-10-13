pipeline {  
    agent any  

    environment {  
        ENV_EXPRESS = credentials('.env-express')  
        ENV_NEST = credentials('.env-nest')  
        VITE_API_EXPRESS = 'http://localhost:3000/'  
        VITE_API_NESTJS = 'http://localhost:3001/'  
        DATABASE_URL = 'postgresql://postgres:admin@localhost:5432/express_nest_db'  
    }  

    stages {  
        stage('Source Code Retrieval') {  
            steps {  
                echo 'Checking out the code from repository...'  
                git branch: 'main', url: 'https://github.com/GentraAW/express-nest-crud.git'  
            }  
        }  

        stage('Environment Setup') {  
            steps {  
                script {  
                    writeFile file: 'express-service/.env', text: ENV_EXPRESS  
                    echo 'Created .env file for Express'  

                    writeFile file: 'nest-service/.env', text: ENV_NEST  
                    echo 'Created .env file for NestJS'  
                }  
            }  
        }  

        // stage('Database Schema Generation') {  
        //     steps {  
        //         dir('nest-service') {  
        //             bat 'npx prisma generate'  
        //         }  
        //     }  
        // }  

        stage('Dependency Installation') {  
            parallel {  
                stage('Express Backend Setup') {  
                    steps {  
                        dir('express-service') {  
                            bat 'npm ci'  
                        }  
                    }  
                }  

                stage('Nest Backend Setup') {  
                    steps {  
                        dir('nest-service') {  
                            bat 'npm ci'  
                        }  
                    }  
                }  

                stage('React Frontend Setup') {  
                    steps {  
                        dir('react-js') {  
                            bat 'npm ci'  
                        }  
                    }  
                }  
            }  
        }  

        stage('Application Deployment') {  
            parallel {  
                stage('Launch Express Server') {  
                    steps {  
                        dir('express-service') {  
                            bat 'start /B npm run dev'  
                        }  
                        script {  
                            def envContent = readFile('express-service/.env')  
                            echo "Express configuration: ${envContent}"  
                        }  
                    }  
                }  

                stage('Launch NestJS Server') {  
                    steps {  
                        dir('nest-service') {  
                            bat 'start /B npm run start:dev'  
                        }  
                        script {  
                            def envContent = readFile('nest-service/.env')  
                            echo "NestJS configuration: ${envContent}"  
                        }  
                    }  
                }  

                stage('Launch React App') {  
                    steps {  
                        dir('react-js') {  
                            bat 'start /B npm run dev'  
                        }  
                    }  
                }  
            }  
        }  
    }  

    post {  
        always {  
            echo 'Pipeline execution completed. Performing cleanup...'  
        }  
        success {  
            echo 'All stages executed successfully.'  
        }  
        failure {  
            echo 'Pipeline encountered errors. Refer to logs for troubleshooting.'  
        }  
    }  
}