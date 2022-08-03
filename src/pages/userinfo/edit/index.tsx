import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Button, PageContainer, Text, Title } from '~/components/atom';
import theme from '~/styles/theme';

const UserinfoEdit: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer>
          <Container>
            <Title>내 정보 수정</Title>
            <Form>
              <FormItem>
                <FormTitle>
                  <Text>이메일</Text>
                </FormTitle>
                <FormGroup>
                  <input type="email" name="email" />
                </FormGroup>
              </FormItem>
              <FormItem>
                <FormTitle>
                  <Text>닉네임</Text>
                </FormTitle>
                <FormGroup>
                  <input type="text" name="nickname" />
                </FormGroup>
              </FormItem>
              <FormItem>
                <FormTitle>
                  <Text>성별</Text>
                </FormTitle>
                <FormGroup>
                  <input type="text" name="sex" />
                </FormGroup>
              </FormItem>
              <FormItem>
                <FormTitle>
                  <Text>생년월일</Text>
                </FormTitle>
                <FormGroup>
                  <input type="email" name="birth" />
                </FormGroup>
              </FormItem>
              <Button size="md" width={195} style={{ marginLeft: 150 }}>
                내 정보 수정
              </Button>
            </Form>
          </Container>
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default UserinfoEdit;

const { borderGray } = theme.color;

const Container = styled.div`
  margin-top: 40px;
  border: 1px solid ${borderGray};
  padding: 74px 76px;
`;

const Form = styled.div`
  margin-top: 76px;
`;

const FormItem = styled.div`
  display: flex;
  height: 70px;
`;

const FormTitle = styled.div`
  width: 150px;
  font-weight: 500;
`;

const FormGroup = styled.div``;
