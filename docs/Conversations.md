# How to write a conversation

This has been a long time coming but you're basically asking me to work overtime and I'm tired

## Example

```typescript
const byePlayer = new DialogNode({
    title: "Bye!",
    messages :()=>[{
        message: "Bye!",
        sprite: "byeNPC"
    }],
    children : {},
    choices : ()=>null
});
export const dialogRoot : DialogOptionTree  = {
    "testing":{
        "counter": new DialogNode({
            title: "I'm a testing npc",
            onVisit: (state:PlayerSave.PlayerSaveState) => ({...state, timesTalked : state.timesTalked + 1}),
            messages: (state: PlayerSave.PlayerSaveState) => [{
                message: "I'm a testing NPC!",
                sprite: "countingNPC"
            },{
                message:`I've been visited ${state.timesTalked} times!`,
                sprite: "countingNPC"
            },{
                message:"", //Sometimes you just need a dummy message to show only the options
                sprite:"countingNPC"
            }],
            children : {
                //This set of children should probably be rendered within messages for best UI, but I need a testing case okay
                "greet" : new DialogNode({
                    title: "I'm a testing npc",
                    messages: () => [{
                        message: "Nice to meet you!",
                        sprite: "countingNPC"
                    },{
                        //maybe make a message generator for this kind of message
                        message: <h1>What do you want to do?</h1>,
                        sprite: "countingNPC"
                    }],
                    choices: ()=>({
                        "Talk Again" : "../",
                        "Bye" : "root://bye"
                    }),
                    children:{}
                }),
                "regreet" : new DialogNode({
                    title: "I'm a testing npc",
                    messages: () => [{
                        message: "Nice to see you again!",
                        sprite: "countingNPC"
                    },{
                        //maybe make a message generator for this kind of message
                        message: <h1>What do you want to do?</h1>,
                        sprite: "countingNPC"
                    }],
                    choices: ()=>({
                        "Talk Again" : "../",
                        "Bye" : "root://bye"
                    }),
                    children:{}
                }),
                "creepy" : new DialogNode({
                    title: "I'm a testing npc",
                    messages: () => [{
                        message: "It's really creepy how you keep talking to me.",
                        sprite: "countingNPC"
                    },{
                        //maybe make a message generator for this kind of message
                        message: <h1>You've creeped them out and they won't talk to you anymore</h1>,
                        sprite: "countingNPC"
                    }],
                    choices: ()=>({
                        "Bye" : "root://bye"
                    }),
                    children:{}
                }),
            },
            choices: (state: PlayerSave.PlayerSaveState) => {
                if(state.timesTalked == 1){
                    return "./greet";
                }else if(state.timesTalked > 4){
                    return "./creepy";
                }else{
                    return "./regreet";
                }
            }
        })
    },
    //You can also reference objects, so they can be imported and shit
    "bye":byePlayer
}
```

## Basics

### Nodes

Dialog starts with nodes. Nodes are simply a point in a conversation.

```typescript
const hiPlayer = new DialogNode({
    title: "I'm a testing npc",
    messages: () => [{
        message: "I'm a testing NPC!",
        sprite: "countingNPC"
    },{
        message:`I've been visited some number of times times!`,
        sprite: "countingNPC"
    },{
        message:"", //Sometimes you just need a dummy message to show only the options
        sprite:"countingNPC"
    }],
    children : {},
    choices : ()=>null
});
```

Here, we've made a node which will display with title "Bye!", and has three messages: each with a text message, ``and a sprite: `countingNPC` `` *One of these days I will get around to implementing this but not today*. When the player visits this conversational node, they will see these three messages.

### State and derivations thereof

But hey! this is a counting NPC! They need to count, not just handwave! This is where `PlayerSaveState` comes in 

```typescript
export interface PlayerSaveState{
    timesTalked: number;
}
```

This is just an object holding all the information about the player. It doesn't do anything on it's own. We have to modify it.

```typescript
const hiPlayer = new DialogNode({
    title: "I'm a testing npc",
    onVisit: (state:PlayerSave.PlayerSaveState) => ({...state, timesTalked : state.timesTalked + 1}),
    messages: () => [{
        message: "I'm a testing NPC!",
        sprite: "countingNPC"
    },{
        message:`I've been visited some number of times times!`,
        sprite: "countingNPC"
    },{
        message:"", //Sometimes you just need a dummy message to show only the options
        sprite:"countingNPC"
    }],
    children : {},
    choices : ()=>null
});
```

Here, `onVisit` is being called with the current PlayerSaveState. It takes the current state, and changes it to reflect what should change: in this case that the number of times talked should increase by one. It should be pure and reduxy, and not mutate the state given to it. 
I realize that none of you probably understood that last sentence, so let me break it down further: The idea is that this method is given the object representing the current player state. It should figure out what the state after this conversation node should be, and return that object. 
The `(state:PlayerSave.PlayerSaveState) => (` just means that this is a function that should be provided the PlayerSaveState, and will return the value right after the `=>`. The `{}` around the entire second bit just means that the object is a javascript object. `...state` is fancy javascript for "take all properties out of `state` and put them on the object you're currently in." And finally, `timesTalked : state.timesTalked + 1` means "set `timesTalked` to what the old state's `timesTalked` was, plus one."

So now, when you talk the NPC, the counter inside `PlayerState`, `PlayerState.timesTalked` will increase by one. But, this doesn't get the NPC to say how many times we've talked to them! You'll notice taht `messages` is also of a similar look: 

```typescript
    messages: () => [{
        message: "I'm a testing NPC!",
        sprite: "countingNPC"
    },{
        message:`I've been visited some number of times times!`,
        sprite: "countingNPC"
    },{
        message:"", //Sometimes you just need a dummy message to show only the options
        sprite:"countingNPC"
    }],
```
it also has the `() =>` going on. That's because messages isn't just an array of messages; no it's a function that returns an array of messages. And just like onVisit, it can also take the player state and use it to change which messages it returns.

```typescript
messages: (state: PlayerSave.PlayerSaveState) => [{
    message: "I'm a testing NPC!",
    sprite: "countingNPC"
},{
    message:`I've been visited ${state.timesTalked} times!`,
    sprite: "countingNPC"
},{
    message:"", //Sometimes you just need a dummy message to show only the options
    sprite:"countingNPC"
}]
```
Here, `${state.timesTalked}` just means insert the variable timesTalked from state into the string.


### Moving around

Hey, but this doesn't get to one of the most important parts of a game: the progression!

`DialogNodes` have children:

```typescript
children : {}
```

Children are just additional `DialogNodes` that are children of the current `DialogNode`. Each child has a reference title. Let's add some children.

```typescript
children : {
    //This set of children should probably be rendered within messages for best UI, but I need a testing case okay
    "greet" : new DialogNode({
        title: "I'm a testing npc",
        messages: () => [{
            message: "Nice to meet you!",
            sprite: "countingNPC"
        },{
            message: <h1>What do you want to do?</h1>,
            sprite: "countingNPC"
        }],
        children:{}
    }),
    "regreet" : new DialogNode({
        title: "I'm a testing npc",
        messages: () => [{
            message: "Nice to see you again!",
            sprite: "countingNPC"
        },{
            message: <h1>What do you want to do?</h1>,
            sprite: "countingNPC"
        }],
        children:{}
    }),
    "creepy" : new DialogNode({
        title: "I'm a testing npc",
        messages: () => [{
            message: "It's really creepy how you keep talking to me.",
            sprite: "countingNPC"
        },{
            message: <h1>You've creeped them out and they won't talk to you anymore</h1>,
            sprite: "countingNPC"
        }],
        children:{}
    }),
},
```

Now this `DialogNode` has children! `./greet` would bring us to the greet child, `./regreet` would bring us to the second, and `./creepy` to the third. However, we don't have the code that decides when to bring us to which child!

```typescript
choices: (state: PlayerSave.PlayerSaveState) => {
    if(state.timesTalked == 1){
        return "./greet";
    }else if(state.timesTalked > 4){
        return "./creepy";
    }else{
        return "./regreet";
    }
}
```

you can also jump to the children of children by putting slashes between child names: `./creepy/evencreepier` would go to your child `creepy`'s child `evencreepier`.

Just like before: player state, return the thing you care about. In this case, you can return just a string if there's only one possible choice. But what if you want more than one choice? One choice doesn't even deserve to be called a choice. That's no choice! 
We want to be able to talk to the NPC again right in their conversation choices, but also be able to leave.

```typescript
"greet" : new DialogNode({
    title: "I'm a testing npc",
    messages: () => [{
        message: "Nice to meet you!",
        sprite: "countingNPC"
    },{
        //maybe make a message generator for this kind of message
        message: <h1>What do you want to do?</h1>,
        sprite: "countingNPC"
    }],
    choices: ()=>({
        "Talk Again" : "../",
        "Bye" : "root://bye"
    }),
    children:{}
}),
```

`../` brings us up to this `DialogNode`'s parent. `./` would bring us to this `DialogNode` again, `.../` would bring us to its parent's parent, `.../other` would bring you to daddy's mommy's child called `other`, etc.

Great! We've made an entire dialog tree! Thing is, we're gonna need more than one of these. There are a lot of conversations to be had. 
That's where the `root://` comes in. Root just means go to the topmost part of the dialog tree, and start navigating from there. This lets us put a lot of different conversations into one tree object, as well as allowing us to store conversation subtrees in variables to be spread across different files for cleanliness and organization.

```typescript
const byePlayer = new DialogNode({
    title: "Bye!",
    messages :()=>[{
        message: "Bye!",
        sprite: "byeNPC"
    }],
    children : {},
    choices : ()=>null
});

export const dialogRoot : DialogOptionTree  = {
    "testing":{
        "counter": new DialogNode({
            ...
    },
    //We reference byePlayer here, letting us potentially put byePlayer in another file or somewhere else.
    //It also let's us reference byePlayer in a lot of places,as you can then kill off lots of characters
    //and they can all use the same death gurgle or smthn.
    "bye":byePlayer
}
```

Since we're probably going to have a lot of nodes just for organizational purposes, the top level of the tree doesn't require you to be a full `DialogNode`, but you can cheat and just have the children bit.

If you have questions (which you will cause this is complicated and I didn't explain it well) message and ping me on discord in #programming. See ya.
