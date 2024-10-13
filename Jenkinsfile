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
        stage("Create: Express service env") {  
            steps {  
                dir('express-service') {  
                    script {  
                        withCredentials([file(credentialsId: "express-env", variable: 'SECRET_FILE_EXPRESS')]) {  
                            writeFile file: '.env', text: readFile(file: "${SECRET_FILE_EXPRESS}")  
                        }  
                    }  
                }  
            }  
        }  
        stage("Create: Nest service env") {  
            steps {  
                dir('nest-service') {  
                    script {  
                        withCredentials([file(credentialsId: "nest-env", variable: 'SECRET_FILE_NEST')]) {  
                            writeFile file: '.env', text: readFile(file: "${SECRET_FILE_NEST}")  
                        }  
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