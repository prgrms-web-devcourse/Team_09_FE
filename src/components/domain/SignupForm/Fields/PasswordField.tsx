import React, { ChangeEvent, useCallback, useState } from 'react';
import { Input, Label, Text } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';
import theme from '~/styles/theme';

interface PasswordFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange, errors }) => {
  const [error, setError] = useState(errors);

  const handleBlur = useCallback(() => {
    setError(errors);
  }, [errors]);

  return (
    <Field>
      <Label htmlFor="password" text="비밀번호" />
      <Text size="xs" color={theme.color.fontGray}>
        영문, 숫자를 포함한 12자 이상의 비밀번호를 입력해주세요.
      </Text>
      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        required
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
      />
      {error && <ErrorMessage message={error} />}
    </Field>
  );
};

export default React.memo(PasswordField);