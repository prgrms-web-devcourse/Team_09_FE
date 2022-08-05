import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { PageContainer } from '~/components/atom';
import {
  CategoryTitle,
  CourseList,
  SelectRegion,
  SelectTags,
  SortFilter
} from '~/components/common';
import { Region, SearchTagsValues } from '~/types';

const Course: NextPage = () => {
  const handleSelectRegion = async (region: Region | '전체보기') => {
    console.log('코스페이지', region);
  };

  const handleSelectTags = async (data: SearchTagsValues) => {
    console.log('코스페이지', data);
  };

  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageContainer>
          <CategoryTitle name="여행코스" />
          <FilterList>
            <SelectRegion onSelect={handleSelectRegion} />
            <SelectTags style={{ marginTop: '24px' }} onSelect={handleSelectTags} />
          </FilterList>
          <SortFilter />
          <CourseList />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default Course;

const FilterList = styled.div`
  margin-bottom: 30px;
`;
