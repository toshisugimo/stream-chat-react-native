import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { useTheme } from '../../../contexts/themeContext/ThemeContext';
import {
  TDateTimeParserInput,
  TranslationContextValue,
  useTranslationContext,
} from '../../../contexts/translationContext/TranslationContext';
import { getDateString } from '../../../utils/getDateString';

export type MessageTimestampProps = Partial<Pick<TranslationContextValue, 'tDateTimeParser'>> & {
  /**
   * Whether to show the time in Calendar time format. Calendar time displays time relative to a today's date.
   */
  calendar?: boolean;
  /**
   * The format in which the date should be displayed.
   */
  format?: string;
  /**
   * A function to format the date.
   */
  formatDate?: (date: TDateTimeParserInput) => string;
  /**
   * Already Formatted date
   */
  formattedDate?: string | Date;
  /**
   * The timestamp of the message.
   */
  timestamp?: string | Date;
};

export const MessageTimestamp = (props: MessageTimestampProps) => {
  const {
    calendar,
    format,
    formatDate,
    formattedDate,
    tDateTimeParser: propsTDateTimeParser,
    timestamp,
  } = props;

  const {
    theme: {
      colors: { grey },
      messageSimple: {
        content: { timestampText },
      },
    },
  } = useTheme();
  const { tDateTimeParser: contextTDateTimeParser } = useTranslationContext();

  if (formattedDate) {
    return (
      <Text style={[styles.text, { color: grey }, timestampText]}>{formattedDate.toString()}</Text>
    );
  }

  if (!timestamp) return null;

  const dateString = getDateString({
    calendar,
    date: timestamp,
    format,
    formatDate,
    tDateTimeParser: propsTDateTimeParser || contextTDateTimeParser,
  });

  if (!dateString) return null;

  return <Text style={[styles.text, { color: grey }, timestampText]}>{dateString.toString()}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
  },
});
