import * as React from 'react'
import { ActivityIndicator, View, StyleSheet, Platform } from 'react-native'

export default class Loader extends React.Component<null, null> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <View style={styles.progressBar}>
        <ActivityIndicator
          size="large"
          color={Platform.OS === 'ios' ? 'white' : '#EA0000'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    justifyContent: 'center'
  }
})
