require('./styles.css')
import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import Panel from '../app/components/Panel/Panel'
import Spinner from '../app/components/Spinner/Spinner'
import Login from '../app/components/Login/Login'
import Main from '../app/components/Main/Main'
import Notes from '../app/components/Notes/Notes'
import Tag from '../app/components/Tag/Tag'
import TagList from '../app/components/TagList/TagList'
import Category from '../app/components/Category/Category'
import CategoryList from '../app/components/CategoryList/CategoryList'
import ItemCard from '../app/components/ItemCard/ItemCard'
import AddCategory from '../app/components/AddCategory/AddCategory'
import Rating from '../app/components/Rating/Rating'

import InviteFriend from '../app/components/InviteFriend/InviteFriend'


const categories = [
  {
    id: 1,
    "name": "First Category",
    "tags": [
      "Tony",
      "Amelia"
    ]
  },{
    id: 2,
    "name": "Second Category",
    "tags": [
      "diabetes",
      "hyperventilation",
      "high blood pressure"
    ]
  },{
    id: 3,
    "name": "Third Category",
    "tags": [
      "blood",
      "pain",
      "adrenaline",
      "vertigo"
    ]
  },{
    id: 4,
    "name": "4 Category",
    "tags": null
  },
]

const emptyCategories = [
  {
    id: 1,
    "name": "First Category",
    "tags": []
  },{
    id: 2,
    "name": "Second Category"
  },{
    id: 3,
    "name": "Third Category",
    "tags": null
  },
]

const item = {
  "id": "589b50095c3a60a6eb05522e",
  "url": "https://yandex.ru",
  "title": "Это всё тот же Яндекс",
  "rating": 3,
  "note": "Just a simple note",
  "createdAt": "2017-02-08T17:06:17.354Z",
  "categories": [
    {
      "id": "589c963d529fc764e0e87b4e",
      "name": "First Category",
      "tags": [
        "Tony"
      ]
    },
    {
      "id": "589c970eddbd3467a4474612",
      "name": "Second Category",
      "tags": ['diabetes']
    }
    // {
    //  "id": "589c9aefd5294a6c4749ee77",
    //  "name": "Third Category",
    //  "tags": ['blood', 'vertigo']
    // }
  ]
}

const item_no_categories = {
  "id": "589b50095c3a60a6eb05522e",
  "url": "https://yandex.ru",
  "title": "Это всё тот же Яндекс",
  "rating": 3,
  "note": "Just a simple note",
  "createdAt": "2017-02-08T17:06:17.354Z"
}

const Pane = props =>
  <div style={{width: 370, background: '#44C6ED'}}>
    {props.children}
  </div>

storiesOf('Panel', module)
  .add('Initial', () => <Pane><Panel /></Pane>)
  .add('Login', () => <Pane><Panel><Login/></Panel></Pane>)
  .add('Login thinking', () => <Pane><Panel><Login state="thinking"/></Panel></Pane>)
  .add('Logged in saved', () => <Pane><Panel loggedin saved /></Pane>)
  .add('Logged in', () => <Pane><Panel loggedin /></Pane>)

const tags = ['Tony', 'Amelia', 'diabetes', 'hyperventilation', 'high blood pressure']
const userTags = ['Tony', 'diabetes']

storiesOf('Components', module)
  .add('Notes', () =>
  <Pane>
    <Panel>
      <Notes value={'This is a notes'} onChange={() => {}} />
    </Panel>
  </Pane>)
  .add('Rating', () =>
  <Pane>
    <Panel>
      <Rating />
    </Panel>
  </Pane>)
  .add('Spinner', () =>
    <Pane>
      <Panel>
        <Spinner />
      </Panel>
    </Pane>)

storiesOf('Tag', module)
  .add('Tag Inactive', () =>
    <Tag active={false} onClick={linkTo('Tag', 'Tag Active')} name='Tony'/>
  )
  .add('Tag Active', () =>
    <Tag active={true} onClick={linkTo('Tag', 'Tag Inactive')} name='Tony'/>
  )
  .add('Tag Edit', () =>
    <Tag name='Tony' edit={true}/>
  )
  .add('TagList', () =>
    <TagList tags={tags}
             itemTags={userTags}
             addCategoryTag={action('On add new category tag')}
             onTagsChange={action('On tag change')}
    />
  )

storiesOf('Category', module)
  .add('Category with selected tags', () => {

    return <Category category={categories[0]}
                     itemCategories={item.categories}
                     addCategoryTag={(id, tag) => console.log(id, tag)}
                     addItemCategory={data => console.log('ADD', data, item.categories)}
                     updateItemCategory={(id, data) => console.log('UPDATE',id, data, item.categories) }
                     removeItemCategory={id => console.log('REMOVE', id, item.categories) } />
  })
  .add('Category without selected tags', () => {

    return <Category category={categories[2]}
                     itemCategories={item.categories}
                     addCategoryTag={(id, tag) => console.log(id, tag)}
                     addItemCategory={data => console.log('ADD', data, item.categories)}
                     updateItemCategory={(id, data) => console.log('UPDATE',id, data, item.categories) }
                     removeItemCategory={id => console.log('REMOVE', id, item.categories) } />
  })
  .add('Category item list with selected tags', () => {
    return <CategoryList categories={categories}
                         itemCategories={item.categories}
                         addCategoryTag={(id, tag) => console.log(id, tag)}
                         addItemCategory={data => console.log('ADD', data, item.categories)}
                         updateItemCategory={(id, data) => console.log('UPDATE',id, data, item.categories) }
                         removeItemCategory={id => console.log('REMOVE', id, item.categories) }
                         toggleCategories={() => {}}
                         addNewCategory={() => {}}
    />
  })
storiesOf('Item', module)
  .add('Item card with empty user & predafined categories', () =>
    <Pane>
      <Panel loggedin>
        <ItemCard categories={emptyCategories}
                  item={item_no_categories}
                  filterEnabled={false}
                  filter={false}
                  addCategoryTag={(id, tag) => console.log(id, tag)}
                  addItemCategory={data => console.log('ADD', data, item.categories)}
                  updateItemCategory={(id, data) => console.log('UPDATE',id, data, item.categories) }
                  removeItemCategory={id => console.log('REMOVE', id, item.categories) }
                  toggleCategories={() => {}}
                  addNewCategory={() => {}}
                  ratingChange={rating => console.log(rating)}
                  notesChange={notes => console.log(notes)}
        />
      </Panel>
    </Pane>
  )
  .add('Item card with categories & filter enabled', () =>
    <Pane>
      <Panel loggedin>
        <ItemCard categories={categories}
                  item={item}
                  filterEnabled={true}
                  filter={true}
                  addCategoryTag={(id, tag) => console.log(id, tag)}
                  addItemCategory={data => console.log('ADD', data, item.categories)}
                  updateItemCategory={(id, data) => console.log('UPDATE',id, data, item.categories) }
                  removeItemCategory={id => console.log('REMOVE', id, item.categories) }
                  toggleCategories={() => {}}
                  addNewCategory={() => {}}
                  ratingChange={rating => console.log(rating)}
                  notesChange={notes => console.log(notes)}
        />
      </Panel>
    </Pane>
  )
  .add('Item card no item categories', () =>
    <Pane>
      <Panel loggedin>
        <ItemCard categories={categories}
                  item={item_no_categories}
                  filter={false}
                  addCategoryTag={(id, tag) => console.log(id, tag)}
                  addItemCategory={data => console.log('ADD', data, item.categories)}
                  updateItemCategory={(id, data) => console.log('UPDATE',id, data, item.categories) }
                  removeItemCategory={id => console.log('REMOVE', id, item.categories) }
                  toggleCategories={() => {}}
                  addNewCategory={() => {}}
                  ratingChange={rating => console.log(rating)}
                  notesChange={notes => console.log(notes)}
        />
      </Panel>
    </Pane>
  )
  .add('Item card thinking', () =>
    <Pane>
      <Panel loggedin>
        <ItemCard categories={categories}
                  item={item}
                  addCategoryTag={(id, tag) => console.log(id, tag)}
                  addItemCategory={data => console.log('ADD', data, item.categories)}
                  updateItemCategory={(id, data) => console.log('UPDATE',id, data, item.categories) }
                  removeItemCategory={id => console.log('REMOVE', id, item.categories) }
                  toggleCategories={() => {}}
                  addNewCategory={() => {}}
                  ratingChange={rating => console.log(rating)}
                  notesChange={notes => console.log(notes)}
                  thinking
        />
      </Panel>
    </Pane>
  )
  .add('Add category active', () =>
    <Pane>
      <Panel>
        <div style={{flex: 0.5, backgroundColor: 'red'}}>CATEGORIES</div>
        <div style={{flex: 0.5, backgroundColor: 'green', position: 'relative'}}>
          <AddCategory  active={true} />
        </div>
      </Panel>
    </Pane>
  )
  .add('Add category inactive', () =>
    <Pane>
      <Panel>
        <div style={{flex: 0.5, backgroundColor: 'red'}}>CATEGORIES</div>
        <div style={{flex: 0.5, backgroundColor: 'green', position: 'relative'}}>
          Controls
          <AddCategory active={false} />
        </div>
      </Panel>
    </Pane>
  )

storiesOf('Invite a friend', module)
  .add('Invite a friend Modal', () =>
    <Pane>
      <Panel loggedin onSendInvitation={() => {}} toggleInviteFriend={() => {}} inviteFriend={true} auth={{invitation_send: false}}>
        <ItemCard categories={categories}
                  item={item}
                  filterEnabled={true}
                  filter={true}
                  addCategoryTag={(id, tag) => console.log(id, tag)}
                  addItemCategory={data => console.log('ADD', data, item.categories)}
                  updateItemCategory={(id, data) => console.log('UPDATE',id, data, item.categories) }
                  removeItemCategory={id => console.log('REMOVE', id, item.categories) }
                  toggleCategories={() => {}}
                  addNewCategory={() => {}}
                  ratingChange={rating => console.log(rating)}
                  notesChange={notes => console.log(notes)}
        />
      </Panel>
    </Pane>
  )
  .add('Invite a friend thinking Modal', () =>
    <Pane>
      <Panel loggedin onSendInvitation={() => {}} toggleInviteFriend={() => {}} inviteFriend={true} auth={{invitation_send: false, thinking: true}}>
        <ItemCard categories={categories}
                  item={item}
                  filterEnabled={true}
                  filter={true}
                  addCategoryTag={(id, tag) => console.log(id, tag)}
                  addItemCategory={data => console.log('ADD', data, item.categories)}
                  updateItemCategory={(id, data) => console.log('UPDATE',id, data, item.categories) }
                  removeItemCategory={id => console.log('REMOVE', id, item.categories) }
                  toggleCategories={() => {}}
                  addNewCategory={() => {}}
                  ratingChange={rating => console.log(rating)}
                  notesChange={notes => console.log(notes)}
        />
      </Panel>
    </Pane>
  )
  .add('Invite a friend success Modal', () =>
  <Pane>
    <Panel loggedin onSendInvitation={() => {}} toggleInviteFriend={() => {}} inviteFriend={true} auth={{invitation_send: true}}>
      <ItemCard categories={categories}
                item={item}
                filterEnabled={true}
                filter={true}
                addCategoryTag={(id, tag) => console.log(id, tag)}
                addItemCategory={data => console.log('ADD', data, item.categories)}
                updateItemCategory={(id, data) => console.log('UPDATE',id, data, item.categories) }
                removeItemCategory={id => console.log('REMOVE', id, item.categories) }
                toggleCategories={() => {}}
                addNewCategory={() => {}}
                ratingChange={rating => console.log(rating)}
                notesChange={notes => console.log(notes)}
      />
    </Panel>
  </Pane>
)

