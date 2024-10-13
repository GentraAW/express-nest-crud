pipeline {  
    agent any  
    environment {  
        SECRET_FILE_EXPRESS = credentials('express-env')  
        SECRET_FILE_NEST = credentials('nest-env')  
    }  
    tools {  
        nodejs 'NodeJS'  
    }  
    stages {  
        stage("Create ExpressJS Service ENV") {  
            steps {  
                dir('express-service') {  
                    withCredentials([file(credentialsId: 'express-env', variable: 'EXPRESS_ENV_FILE')]) {  
                        sh 'cp $EXPRESS_ENV_FILE .env'  
                    }  
                }  
            }  
        }  
        stage("Create NestJS Service ENV") {  
            steps {  
                dir('nest-service') {  
                    withCredentials([file(credentialsId: 'nest-env', variable: 'NEST_ENV_FILE')]) {  
                        sh 'cp $NEST_ENV_FILE .env'  
                    }  
                }  
            }  
        } 
        stage("Build: Express and Nest service") {  
            steps {  
                parallel (  
                    "run express" : {  
                        dir("express-service") {  
                            sh "npx prisma generate"  
                            sh "npm install"  
                            sh "npm run dev"  
                        }  
                    },  
                    "run nest" : {  
                        dir("nest-service") {  
                            sh "npx prisma generate"  
                            sh "npm install"  
                            sh "npm run start"  
                        }  
                    }  
                )  
            }  
        }  
    }  
}