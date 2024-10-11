import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import { Server, Zap } from 'lucide-react';
import { useFramework } from '../utils/FrameworkContext';

function LandingPage() {
  const navigate = useNavigate();
  const { selectedFramework, setSelectedFramework } = useFramework();

  const handleFrameworkSelect = (framework) => {
    setSelectedFramework(framework);
    navigate('/dashboard', { state: { backend: framework } });
  };

  return (
    <div className="flex items-center justify-center h-screen space-x-4 bg-gray-100">
      <div className="space-y-6">
        <Typography variant="h3" className="text-center">
          Choose your framework
        </Typography>
        <div className="flex justify-center space-x-4">
          <Card
            className={`w-64 shadow-lg ${
              selectedFramework === 'express' ? 'border-2 border-green-500' : ''
            }`}
          >
            <CardBody className="flex flex-col items-center space-y-4">
              <Server size={48} color="#10b981" />
              <Typography variant="h5">Express.js</Typography>
              <Typography variant="paragraph" className="text-center">
                A popular and lightweight Node.js web application framework for
                building applications.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                className="w-full text-white bg-green-500"
                onClick={() => handleFrameworkSelect('express')}
              >
                Choose Express.js
              </Button>
            </CardFooter>
          </Card>
          <Card
            className={`w-64 shadow-lg ${
              selectedFramework === 'nest' ? 'border-2 border-blue-500' : ''
            }`}
          >
            <CardBody className="flex flex-col items-center space-y-4">
              <Zap size={48} color="#3b82f6" />
              <Typography variant="h5">Nest.js</Typography>
              <Typography variant="paragraph" className="text-center">
                A progressive Node.js framework for building efficient and
                scalable server-side applications.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                className="w-full text-white bg-blue-500"
                onClick={() => handleFrameworkSelect('nest')}
              >
                Choose Nest.js
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
