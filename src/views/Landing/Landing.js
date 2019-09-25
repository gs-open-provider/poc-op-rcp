import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

import { commonStyles } from '../../theme/commonStyles';


const TABSLIST = [
  'membership plan',
  'new gtlds overview',
  'domain management',
  'dns management',
  'ssl certificates',
  'license management',
  'power panel',
  'smbinvoices',
  'spamexperts',
  'prices',
  'customer management',
  'account',
  'notification center',
  'knowledge base',
];

class Landing extends React.Component{
  render() {
    const { t } = this.props;

    return (
      <div>
        <Container maxWidth="xl">
          <div style={commonStyles.container}>
            <Grid container spacing={4} style={{paddingTop: 10}}>
              <Grid item xs={12} md={4} lg={3}>
                {
                  TABSLIST && TABSLIST.length > 0 && TABSLIST.map(tab => (
                    <Paper style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 4 }}>
                      <div style={{display: 'flex', height: 40, alignItems: 'center'}}>{t(tab)}</div>
                    </Paper>
                  ))
                }
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}


export default withTranslation()(Landing);
