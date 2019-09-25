import React from 'react';
import { AppBar, Tabs, Tab, Button, Menu, MenuItem } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";

import { LANGUAGES } from '../../config';

class Appbar extends React.Component {
  state = {
    value: 0,
    open: false,
    lang: {
      code: "en",
      icon: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png",
    },
    anchorEl: null,
  };

  componentDidMount() {
    switch (window.location.pathname) {
      case '/me':
        this.setState({ value: 1 });
        break;
      default:
        this.props.history.push('/in');
        break;
    }
    console.log('LANG', i18n);
    console.log('LANG', i18n.language);
    setTimeout(() => {
      console.log('LANG', i18n.language);
      this.setState({ lang: this.getLanguageProps() });
    }, 100);
  }

  getLanguageProps = () => {
    for (let i in LANGUAGES) {
      console.log(LANGUAGES[i], i18n.language);
      if (LANGUAGES[i].code === i18n.language) {
        return LANGUAGES[i];
      }
    }
    console.warn("Prop");
    return this.state.lang;
  }

  onTabItemClick = (value, pathname) => {
    this.setState({ value });
    this.props.history.push(pathname);
  };

  openLanguagesMenu = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  onLanguageItemClick = lang => {
    // Update store to change the global language..
    this.setState({ lang, open: false })
    i18n.changeLanguage(lang.code);
  }

  render() {
    const { t } = this.props;

    return (
      <div style={{position: "sticky"}}>
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
            <Tab label="INDEX" onClick={() => this.onTabItemClick(0, '/in')} />
          </Tabs>
          <div style={{display: 'flex', alignItems: 'center'}}>{t('Welcome to React')}</div>
          <div style={{display: 'flex', alignItems: 'center'}}>{t('welcome')}</div>
          <div style={{display: 'flex'}}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={evt => this.openLanguagesMenu(evt)}>
              <img src={this.state.lang.icon} alt={"flag"} width={12} />&nbsp;{ this.state.lang.code }
            </Button>
            <Menu
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
                    <img src={item.icon} alt={"adgfhjkg"} width={12} />&nbsp;{item.code}
                  </MenuItem>
                ))
              }
            </Menu>
          </div>
        </AppBar>
      </div>
    );
  }
}


export default withTranslation()(Appbar);
