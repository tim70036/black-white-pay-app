import React from 'react';
import {
  Container, Content, Text, H1, H2,
} from 'native-base';
import Spacer from './Spacer';

const Blank = () => (
  <Container>
    <Content padder>
      <Spacer size={30} />
      <H1>
        {'Heading 1'}
      </H1>
      <Spacer size={10} />
      <Text>
        {'Hi world!!'}
      </Text>

      <Spacer size={30} />
      <H2>
        {'Heading 2'}
      </H2>
    </Content>
  </Container>
);

export default Blank;
