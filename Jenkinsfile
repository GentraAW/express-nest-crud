pipeline {  
    agent any  

    environment {  
        ENV_EXPRESS = credentials('.env-express')  
        ENV_NEST = credentials('.env-nest')  
        VITE_API_EXPRESS = 'http://localhost:3000/'  
        VITE_API_NESTJS = 'http://localhost:3001/'  
    }  

    stages {  
        stage('Checkout Code') {  
            steps {  
                echo 'Checking out the code from repository...'  
                git branch: 'main', url: 'https://github.com/GentraAW/express-nest-crud.git'  
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

        stage('Prisma Generate') {  
            steps {  
                dir('nest-service') {  
                    bat 'npx prisma generate'  
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
                        dir('react-js') {  
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
                            bat 'npm run dev'
                            script {  
                                sleep(time: 5, unit: 'SECONDS')  
 
                                def response = curl -s http://localhost:3000/health  
                                if (response != "Server is running") {  
                                    error "Server did not start successfully"  
                                }  
                            }  
                        }  
                    }  
                }    

                stage('Start BE-NestJS') {  
                    steps {  
                        dir('nest-service') {  
                            bat 'npm run start:dev'  
                        }  
                        script {  
                            def envContent = readFile('nest-service/.env')  
                            echo "NestJS .env file content: ${envContent}"  
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