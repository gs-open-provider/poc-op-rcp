import React from 'react';
import { AppBar, Tabs, Tab, Button, Menu, MenuItem } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";

let LANGUAGES = [];

class Appbar extends React.Component {
  state = {
    value: 0,
    open: false,
    lang: {
      code: localStorage.getItem('op_rcp_user_language_code') || "en",
      icon: localStorage.getItem('op_rcp_user_language_icon') || "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png",
    },
    anchorEl: null,
  };

  async componentDidMount() {
    const resp = await (await fetch('http://localhost:9090/v1/admin/languages')).json();
    if (resp && resp.success) {
      for (const i in resp.data) {
        LANGUAGES.push({
          code: resp.data[i].language,
          icon: resp.data[i].iconUrl,
          label: resp.data[i].label,
        });
      }
    }

    switch (window.location.pathname) {
      case '/me':
        this.setState({ value: 1 });
        break;
      default:
        this.props.history.push('/in');
        break;
    }
    setTimeout(() => {
      this.setState({ lang: this.getLanguageProps() });
    }, 100);
  }

  getLanguageProps = () => {
    for (let i in LANGUAGES) {
      if (LANGUAGES[i].code === i18n.language) {
        return LANGUAGES[i];
      }
    }
    console.warn("Prop not found for selected language. Hence, falling back to default language (English)");
    return {
      code: "en",
      icon: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png",
    };
  }

  onTabItemClick = (value, pathname) => {
    this.setState({ value });
    this.props.history.push(pathname);
  };

  openLanguagesMenu = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  onLanguageItemClick = lang => {
    this.setState({ lang, open: false })
    i18n.changeLanguage(lang.code);
    localStorage.setItem('op_rcp_user_language_code', lang.code);
    localStorage.setItem('op_rcp_user_language_icon', lang.icon);
  }

  render() {
    const { t, tReady } = this.props;

    return (
      <div style={{position: "sticky"}}>
        {
          <AppBar position="static" color="default" style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Tabs
              value={this.state.value}
              scrollButtons="on"
              indicatorColor="secondary"
              textColor="primary"
              variant="scrollable"
              aria-label="scrollable auto tabs example"
              style={{justifyContent: 'center', alignItems: 'center'}}
            >
              {tReady && <Tab label={t`INDEX`} onClick={() => this.onTabItemClick(0, '/in')} />}
            </Tabs>
            {tReady && <div style={{display: 'flex', alignItems: 'center'}}>{t('WELCOME')}</div>}
            <div style={{display: 'flex'}}>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={evt => this.openLanguagesMenu(evt)}>
                <img src={this.state.lang.icon} alt={"flag"} width={12} />&nbsp;{ this.state.lang.code }
              </Button>
              {
                LANGUAGES && LANGUAGES.length > 0 && <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={this.state.open}
                  onClose={() => this.setState({open: false})}
                  PaperProps={{
                    style: {
                      maxHeight: 200,
                    },
                  }}
                >
                  {
                    LANGUAGES.map(item => (
                      <MenuItem
                        key={item.code}
                        selected={item.code === this.state.lang.code}
                        onClick={() => this.onLanguageItemClick(item)}
                      >
                        <img src={item.icon} alt={item.code} width={12} />&nbsp;{item.code}
                      </MenuItem>
                    ))
                  }
                </Menu>
              }
            </div>
          </AppBar>
        }
      </div>
    );
  }
}


export default withTranslation()(Appbar);
