import { Box, Button, Card, CardContent, Checkbox, Grid, TextField, Typography } from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react"
import { compareObjects } from "../../../utilities/helper-functions";
import TagList from "../../../components/tag-list";


const AddTopics = ({
  course,
  topicList,
  onAdd,
  onCancel
}) => {
  const modalBoxStyle = {
    position: 'relative',
    top: 'calc(var(--app-body-height)*0.125)',
    left: 'inherit',
    // transform: 'translate(0, -50%)',
    width: 'inherit',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 'calc(var(--app-body-height)*0.75)',
    overflowY: 'auto'
  };

  const [addDisabled, setAddDisabled] = useState(true)

  const [topics, setTopics] = useState(topicList
    .filter(({id, foreignLanguage: fl, nativeLanguage: nl}) => 
    !course.posts.find(({ id: postId }) => postId === id) 
      && compareObjects(fl, course.foreignLanguage) 
      && compareObjects(nl, course.nativeLanguage)
    )
    .map(topic => ({...topic, checked:false})))

  const onChange = (ID) => {
    const newTopics = [...topics]
    const topic = newTopics.find(({id}) => id === ID)
    topic.checked = !topic.checked
    setTopics(newTopics)
  }

  useEffect(() => {
    const checkedExists = !!topics.find(({ checked }) => checked);
    
    (addDisabled === checkedExists) && setAddDisabled(!addDisabled)

  }, [addDisabled, topics])

  const [filter, setFilter] = useState('')

  return (
    <Box sx={modalBoxStyle}>
      <Typography id="modal-modal-title" variant='h6'>{t('trainings.title')}</Typography>
      <Typography id="modal-modal-description" variant="caption">{t('courses.course.trainings.add_prompt')}</Typography>

      <TextField fullWidth hiddenLabel value={filter} variant="filled" size="small"
        id="filled-hidden-label-small"
        placeholder={t("courses.course.trainings.add_topics_filter_placeholder")}
        onChange={({target: { value }}) => setFilter(value.toLowerCase())}
        sx={{ my: '1rem' }}
      />

      <Grid container item xs={12}>
      {
        topics
          .filter(({text, tags}) => !filter || `${text}|${tags.map(({name}) => name).join('|')}`.toLowerCase().includes(filter))
          .sort(({text:a},{text:b}) => a<b?-1:a>b?1:0)
          .map(({id, text, checked, tags, createdDate}, idx) => {          
          return <Card key={`${idx}`} sx={{width:'100%', my:'0.5rem' }}>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item xs={11} >
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography color='Chocolate'>{text}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ color: 'lightgray', fontSize: '0.75em'}}>
                        {(new Date(createdDate)).toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <TagList tags={tags} onClick={({name}) => setFilter && setFilter(name)}/>
                </Grid>
                <Grid item xs={1}>
                  <Checkbox checked={checked} onChange={()=>{onChange(id)}}/>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        })
      }
      </Grid>
      <Grid container spacing={2} marginTop="1rem" justifyContent="space-around">
        <Grid item xs={5} sm={5} md={4} lg={3}>
          <Button fullWidth variant="contained" disabled={addDisabled} onClick={() => { 
            onAdd && onAdd(topics?.filter(({checked}) => checked).map(({checked, ...otherProps}) => otherProps))
          }} >
            {t("actions.add")}
          </Button>
        </Grid>
        <Grid item xs={5} sm={5} md={4} lg={3}>
          <Button fullWidth variant="outlined" onClick={onCancel}>{t("actions.cancel")}</Button>
        </Grid>
      </Grid>
    </Box>
  )  
}

export default AddTopics