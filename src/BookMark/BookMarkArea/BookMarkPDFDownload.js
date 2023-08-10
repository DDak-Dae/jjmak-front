import { Document, Font, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React, { useState } from 'react';

Font.register({family: 'NanumGothic', src : 'static/font/NanumGothic.otf'})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontFamily:'NanumGothic'
  }
});

function BookMarkDownload({ bookMarkChatList }) {
  return (
    <div>
      <PDFViewer style={{ width: '50vw', height: '70vh' }}>
        <Document>
          <Page size='A4' style={styles.page}>
            <View style={styles.section}>
            {bookMarkChatList.map((chatData, index) => (
                <Text key={index}>{chatData}</Text>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
export default BookMarkDownload;