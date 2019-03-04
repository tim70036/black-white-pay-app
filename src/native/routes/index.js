import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import MenuIcon from '../components/MenuIcon';
import DrawerContent from '../../containers/DrawerContent';



const Routes = (
  <Stack key="root" hideNavBar>

    <Drawer
      hideNavBar
      key="drawer"
      onExit={() => {
        console.log('Drawer closed');
      }}
      onEnter={() => {
        console.log('Drawer opened');
      }}
      contentComponent={DrawerContent}
      drawerIcon={MenuIcon}
      drawerWidth={300}
      {...DefaultProps.navbarProps}
      >
      <Scene hideNavBar>
        <Stack
          key="home"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="home" component={AboutComponent} />
        </Stack>
        <Stack>
          
        </Stack>
        <Stack>
          
        </Stack>
      </Scene>
    </Drawer>





    <Tabs
      key="tabbar"
      swipeEnabled
      type="replace"
      showLabel={false}
      {...DefaultProps.tabProps}
    >
      <Stack
        key="home"
        title={AppConfig.appName.toUpperCase()}
        icon={() => <Icon name="planet" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="home" component={AboutComponent} />
      </Stack>

      <Stack
        key="recipes"
        title="RECIPES"
        icon={() => <Icon name="book" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="recipes" component={RecipesContainer} Layout={RecipesComponent} />
      </Stack>

      <Stack
        key="recipes"
        title="RECIPES"
        icon={() => <Icon name="book" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="recipes" component={RecipesContainer} Layout={RecipesComponent} />
      </Stack>

      <Stack
        key="recipes"
        title="RECIPES"
        icon={() => <Icon name="book" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="recipes" component={RecipesContainer} Layout={RecipesComponent} />
      </Stack>

      <Stack
        key="profile"
        title="PROFILE"
        icon={() => <Icon name="contact" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
        <Scene
          back
          key="signUp"
          title="SIGN UP"
          {...DefaultProps.navbarProps}
          component={SignUpContainer}
          Layout={SignUpComponent}
        />
      </Stack>
    </Tabs>

    <Scene
      back
      clone
      key="recipe"
      title="RECIPE"
      {...DefaultProps.navbarProps}
      component={}
      Layout={}
    />
  </Stack>
);

export default Routes;
