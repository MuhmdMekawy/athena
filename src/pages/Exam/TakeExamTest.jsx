import React, { useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { AppContext } from '../../contexts/AppContext';
import { useParams } from 'react-router-dom';

const TakeExamComponent = () => {
  const [hubConnection, setHubConnection] = useState(null);
  const [activeExam, setActiveExam] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const { server } = useContext(AppContext);
  const { id } = useParams()
  
  // console.log(id)
  useEffect(() => {
    // Create a SignalR connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${server}/takeexam`) // Replace with the actual URL of your SignalR endpoint
      .build();

    // Start the connection
    connection.start()
    .then(() => {
      console.log('SignalR connected');
      setHubConnection(connection);
    })
    .catch((error) => {
      console.log('SignalR connection error:', error);
    });
    
    
    // Set up event handlers
    connection.on('ActiveExam', (exam) => {
      setActiveExam(exam);
    });

    connection.on('ActiveSection', (sectionDto) => {
      setActiveSection(sectionDto);
    });

    connection.on('AnswerSection', (sectionGuid) => {
      // Handle the response after answering a section
      console.log(`Answered section with ID: ${sectionGuid}`);
    });


    // Clean up the connection on unmount
    return () => {
      if (connection) {
        connection.stop()
          .then(() => {
            console.log('SignalR connection stopped');
          })
          .catch((error) => {
            console.log('SignalR connection stop error:', error);
          });
      }
    };
  }, [server]);

  const handleGetActiveExamById = () => {
    const examId = 'e6d245bf-ea80-49a6-0c46-08dba89fbafc'; // Replace with the actual exam ID you want to retrieve
    hubConnection.invoke('GetActiveExamById', 'e6d245bf-ea80-49a6-0c46-08dba89fbafc')
      .then((response) => {
        // Handle the response here
        console.log('Active Exam:', response);
      })
      .catch((error) => {
        console.log('Error invoking GetActiveExamById:', error);
      });
  };

  const handleGetActiveSectionById = () => {
    const sectionId = 'YOUR_SECTION_ID'; // Replace with the actual section ID you want to retrieve
    hubConnection.invoke('GetActiveSectionById', sectionId)
      .then((response) => {
        // Handle the response here
        console.log('Active Section:', response);
      })
      .catch((error) => {
        console.log('Error invoking GetActiveSectionById:', error);
      });
  };

  const handleAnswerSectionById = () => {
    const sectionId = 'YOUR_SECTION_ID'; // Replace with the actual section ID you want to answer
    const answer = 'YOUR_ANSWER'; // Replace with the actual answer
    const request = {
      sectionId: sectionId,
      answer: answer
    };
    hubConnection.invoke('AnswerSectionById', request)
      .then(() => {
        // Handle the successful answer here
        console.log(`Successfully answered section with ID: ${sectionId}`);
      })
      .catch((error) => {
        console.log('Error invoking AnswerSectionById:', error);
      });
  };

  return (
    <div>
      <button onClick={handleGetActiveExamById}>Get Active Exam</button>
      <br />
      <button onClick={handleGetActiveSectionById}>Get Active Section</button>
      <br />
      <button onClick={handleAnswerSectionById}>Answer Section</button>
      <br />
      <br />
      <br />
      <br />
      <div>
        <h2>Active Exam:</h2>
        {activeExam && (
          <pre>{JSON.stringify(activeExam, null, 2)}</pre>
        )}
      </div>

      <div>
        <h2>Active Section:</h2>
        {activeSection && (
          <pre>{JSON.stringify(activeSection, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default TakeExamComponent;
