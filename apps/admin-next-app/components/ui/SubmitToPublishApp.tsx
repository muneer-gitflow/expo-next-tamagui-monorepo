import { FormLayout, TextField, Button, Text, Checkbox, Select, DropZone } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export default function SubmitToPublishApp() {
  const [appTitle, setAppTitle] = useState('Perfumez by GitSpark');
  const [appDescription, setAppDescription] = useState(
    "Introducing 'gitspark-perfumez-demo', a one-stop perfume shopping app designed by Git Spark, serving the AE Market. Dive into the world of mesmerizing fragrances with this intuitive app. Experience a smooth, hassle-free shopping journey right at your fingertips. Our extensive range includes an array of enchanting aromas to soothe every sensory. Now, picking your desired perfume is just a click away. Discern, decide, and order your preferred product without leaving the comfort of your couch, and get it delivered straight to your doorstep. Our payment platform, Shopify Payments, ensures the security and privacy of your transactions. It’s time to immerse and indulge in the ultimate perfume shopping escapade!",
  );
  const [appKeywords, setAppKeywords] = useState(
    'perfume, UAE, fragrance, scent, cologne, beauty, Git Spark, luxury, aroma, fashion, high-end, exclusive, elite, designer, chic',
  );
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('https://google.com');
  const [countryCode, setCountryCode] = useState('+971');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [supportEmail, setSupportEmail] = useState('gitspark@gitspark.com');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const uploadedFiles = files.length > 0 && (
    <div style={{ marginTop: '10px' }}>
      {files.map((file, index) => (
        <Text key={index}>{file.name}</Text>
      ))}
    </div>
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginTop: '40px',
        }}
      >
        <img src="/hurrey.png" />
        <img src="/appIOS.png" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <Text as="h5" fontWeight="bold" variant="headingLg">
            Your Applicaton is ready to go Live !
          </Text>
          <Text as="span" variant="bodySm">
            Help customers know where they are and find what they need fast.
          </Text>
          <Button variant="primary">Live Now</Button>
        </div>
      </div>
    </>
  );
}
