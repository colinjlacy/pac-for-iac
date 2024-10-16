import React, {useEffect, useState} from 'react';
import './App.css';
import {ResourceService} from "./services/resource-service";
import {Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import logo from './opengarlic-logo.jpeg'

const resourceService = new ResourceService()

export type Resource = {
    _id: string,
    name: string,
    type: string
    allowDelete: boolean,
    module: string
}

function App() {

    const [resources, setResources] = useState([] as Resource[])
    const mapResources = () => {
        const moduleMap: { [key: string]: Resource[] } = {}
        resources.forEach((resource: Resource) => {
            if (moduleMap[resource.module]) {
                moduleMap[resource.module].push(resource)
            } else {
                moduleMap[resource.module] = [resource]
            }
        });
        return moduleMap;
    }

    useEffect(() => {
        async function fetchData() {
            const resources: Resource[] = await resourceService.getResources()
            setResources(resources)
        }

        if (!resources.length) {
            fetchData()
        }
    }, [])

    function handleToggle(id: string) {
        return undefined;
    }

    const resourceList = function (resources: Resource[]) {
        return resources.map((resource: Resource) => {
            return (
                <>
                    <Divider sx={{borderColor: "#777"}}></Divider>
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" primary={resource.type} secondary={resource.name}
                                      primaryTypographyProps={
                                          {variant: "h5"}
                                      } secondaryTypographyProps={
                            {variant: "h6", color: "white"}
                        }/>
                        {/*<Switch*/}
                        {/*    edge="end"*/}
                        {/*    onChange={handleToggle(resource._id)}*/}
                        {/*    inputProps={{*/}
                        {/*        'aria-labelledby': 'switch-list-label-wifi',*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </ListItem>
                </>
            )
        })
    }

    const moduleList = Object.keys(mapResources()).map((moduleName: string) => {
        let checked = ['wifi'];
        return (
            <>
                <Typography variant={"h4"} sx={{marginTop: "1em"}}>
                    {moduleName.split(".").map(str => str[0].toUpperCase() + str.substring(1)).join(" ")}
                </Typography>
                <List sx={{width: '100%', maxWidth: 480,}}>
                    {resourceList(mapResources()[moduleName])}
                </List>
            </>
        )
    })


    return (
        <div className="App">
            <header className="App-header">
                {moduleList}
            </header>
            <img src={logo} style={{position: "fixed", top: "4em", right: "4em", width: "450px", borderRadius: "15px"}}/>
        </div>
    );
}

export default App;
