import React from 'react';
import { Container } from '@material-ui/core';

import { commonStyles } from '../../theme/commonStyles';


class Landing extends React.Component{
  render() {
    return (
      <div>
        <Container maxWidth="xl">
          <div style={commonStyles.container}>
            Some drawer type component
          </div>
        </Container>
      </div>
    );
  }
}


export default Landing;
