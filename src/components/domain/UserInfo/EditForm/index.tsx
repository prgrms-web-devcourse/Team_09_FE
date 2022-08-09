import styled from '@emotion/styled';
import { useFormik } from 'formik';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { Button, Input, Text } from '~/components/atom';
import { ErrorMessage } from '~/components/common';
import { UserApi } from '~/service';
import { ValidationRules } from './rules';

export interface UserEditFormValues {
  email: string;
  nickname: string;
  sex: 'male' | 'female';
  birth: string;
}

interface UserEditForm {
  initialValues: UserEditFormValues;
  onSubmit: (data: UserEditFormValues) => void;
}

const UserEditForm = ({ initialValues, onSubmit: onSubmitAction }: UserEditForm) => {
  const [nicknameError, setNicknameError] = useState('');
  const [isCheckedDuplicateNickname, setIsCheckedDuplicateNickname] = useState(false);
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: ValidationRules,
    onSubmit: (data: UserEditFormValues) => {
      if (!isCheckedDuplicateNickname) {
        setNicknameError('닉네임 중복확인을 해주세요.');
        return;
      }
      onSubmitAction && onSubmitAction(data);
    }
  });

  const handleClickNicknameDuplicate = async () => {
    try {
      await UserApi.nicknameCheck({ nickname: values.nickname });
      window.alert(`${values.nickname}는 사용가능한 닉네임입니다!`);
      setIsCheckedDuplicateNickname(true);
      setNicknameError('');
    } catch (e) {
      setNicknameError('이미 존재하는 닉네임이에요.');
    }
  };

  const handleBlurNickname = () => {
    if (errors.nickname) {
      setNicknameError(errors.nickname);
      return;
    }
    if (!isCheckedDuplicateNickname) {
      setNicknameError('닉네임 중복체크를 해주세요.');
      return;
    }
    setNicknameError(errors.nickname || '');
  };

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckedDuplicateNickname(false);
    handleChange(e);
  };

  const nicknameButtonDisabled = useMemo(() => {
    if (initialValues.nickname === values.nickname) {
      setIsCheckedDuplicateNickname(true);
      return true;
    }
    return !!errors.nickname;
  }, [values.nickname, errors.nickname, initialValues.nickname]);

  const submitButtonDisabled = useMemo(() => {
    if (!isCheckedDuplicateNickname) {
      return true;
    }
    if (nicknameError) {
      return true;
    }
    return (
      Object.values(values).some((value) => value.length === 0) ||
      Object.entries(errors).some((error) => !!error)
    );
  }, [values, errors, isCheckedDuplicateNickname, nicknameError]);

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <label htmlFor="email">이메일</label>
        <Text color="gray">{initialValues.email}</Text>
      </Field>
      <Field>
        <label htmlFor="nickname">닉네임</label>
        <Input
          style={{ width: '310px', marginRight: '10px' }}
          name="nickname"
          placeholder={initialValues.nickname}
          value={values.nickname}
          onChange={handleChangeNickname}
          onBlur={handleBlurNickname}
          autoComplete="off"
        />
        <Button
          style={{ width: '115px' }}
          height={60}
          disabled={nicknameButtonDisabled}
          onClick={handleClickNicknameDuplicate}
        >
          중복확인
        </Button>
      </Field>
      <Error>{nicknameError && <ErrorMessage message={nicknameError} />}</Error>
      <Field>
        <label htmlFor="sex">성별</label>
        <Options role="sex" aria-labelledby="sex">
          <label>
            <input
              type="radio"
              checked={values.sex === 'male'}
              name="sex"
              value="male"
              onChange={handleChange}
            />
            <span>남성</span>
          </label>
          <label>
            <input
              type="radio"
              checked={values.sex === 'female'}
              name="sex"
              value="female"
              onChange={handleChange}
            />
            <span>여성</span>
          </label>
        </Options>
      </Field>
      <Field>
        <label htmlFor="birth">생년월일</label>
        <Input
          style={{ width: '435px' }}
          type="date"
          name="birth"
          placeholder="YYYY-MM-DD"
          value={values.birth}
          onChange={handleChange}
          autoComplete="off"
        />
      </Field>
      <Error>{errors.birth && <ErrorMessage message={errors.birth} />}</Error>
      <Button
        type="submit"
        size="md"
        width={195}
        style={{ marginLeft: 150 }}
        disabled={submitButtonDisabled}
      >
        내 정보 수정
      </Button>
    </Form>
  );
};

export default UserEditForm;

const Form = styled.form`
  margin-top: 50px;

  > button {
    margin-top: 30px;
  }
`;

const Field = styled.div`
  box-sizing: border-box;
  height: 70px;
  display: flex;
  align-items: center;

  > :first-of-type {
    width: 150px;
    font-weight: 500;
  }
`;

const Options = styled.div`
  display: flex;
  gap: 10px;
  span {
    font-size: 16px;
  }
`;

const Error = styled.div`
  margin-left: 160px;
`;
