import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

import { commonStyles } from '../../theme/commonStyles';


const TABSLIST = [
  'MEMBERSHIP_PLAN',
  'NEW_GTLDS_OVERVIEW',
  'DOMAIN_MANAGEMENT',
  'DNS_MANAGEMENT',
  'SSL_CERTIFICATES',
  'LICENSE_MANAGEMENT',
  'POWER_PANEL',
  'SMB_INVOICES',
  'SPAM_EXPERTS',
  'PRICES',
  'CUSTOMER_MANAGEMENT',
  'ACCOUNT',
  'NOTIFICATION_CENTER',
  'KNOWLEDGE_BASE',
];

class Landing extends React.Component{
  render() {
    const { t, tReady } = this.props;

    return (
      <div>
        <Container maxWidth="xl">
          <div style={commonStyles.container}>
            <Grid container spacing={4} style={{paddingTop: 10}}>
              <Grid item xs={12} md={4} lg={3}>
                {
                  TABSLIST && TABSLIST.length > 0 && TABSLIST.map(tab => (
                    <Paper key={tab} style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 4 }}>
                      {tReady && <div style={{display: 'flex', height: 40, alignItems: 'center'}}>{t(tab)}</div>}
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
