import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TextInput, Linking } from 'react-native'
import { Constants, Color, Styles } from '../../../common'
import { Spinner, Text } from '../../../component'
import { useDispatch } from 'react-redux'
import { getWebUrlData } from '../action'
import WebView from 'react-native-webview'

export default function Website() {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const [webUrl, setWebUrl] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    var bodyFormData = new FormData()
    bodyFormData.append('token', 'horseridingv1')
    dispatch(getWebUrlData(bodyFormData))
      .then(res => {
        if (res.value.status === 200) {
          setWebUrl(res.value.data?.data)
          setLoading(false)
        }
      })
      .catch(err => {
        setLoading(false)
      })
  }

  return (
    <View style={styles.mainContainer}>
      {isLoading ? <Spinner /> : null}
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: webUrl
          }}
          setDisplayZoomControls={true}
          setBuiltInZoomControls={true}
          style={{}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.Background,
    position: 'relative'
  }
})
