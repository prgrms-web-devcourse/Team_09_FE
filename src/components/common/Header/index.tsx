import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { PageContainer, Button } from '~/components/atom';
import Logo from '~/components/atom/Logo';
import theme from '~/styles/theme';
import SearchInput from '../SearchInput';

const Header = () => {
  return (
    <HeaderContainer>
      <PageContainer>
        <Inner>
          <LeftArea>
            <Link href="/" passHref>
              <a>
                <Logo width={130} height={35} />
              </a>
            </Link>
            <Category>
              <li>
                <Link href="/course">여행코스</Link>
              </li>
              <li>
                <Link href="/place">추천장소</Link>
              </li>
            </Category>
          </LeftArea>

          <Inner>
            <SearchInput placeholder="지역, 장소를 입력해주세요" />
          </Inner>

          <Buttons>
            <Link href="/course/create" passHref>
              <a>
                <Button>코스등록</Button>
              </a>
            </Link>
            <Link href="/login" passHref>
              <a>
                <Button buttonType="borderPrimary">로그인</Button>
              </a>
            </Link>
          </Buttons>
        </Inner>
      </PageContainer>
    </HeaderContainer>
  );
};

export default Header;

const { mainColor, borderGray } = theme.color;

const HeaderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${borderGray};
`;

const Inner = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;
`;

const LeftArea = styled.div`
  display: flex;
  align-items: center;
`;

const Category = styled.ul`
  display: flex;
  margin-left: 42px;

  li {
    margin-right: 24px;

    // text 속성
    font-size: 20px;
    font-weight: 500;

    &:hover {
      color: ${mainColor};
    }
  }
`;

const Buttons = styled.div`
  button {
    margin-left: 20px;
  }
`;
