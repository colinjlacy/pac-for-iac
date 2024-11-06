import React, {useEffect, useState} from 'react';
import './App.css';
import {ResourceService} from "./services/resource-service";
import {alpha, Divider, List, ListItem, ListItemText, styled, Switch, Typography} from "@mui/material";
import logo from './opengarlic-logo.jpeg'

const resourceService = new ResourceService()

export type Resource = {
    _id: string,
    name: string,
    type: string
    allowDelete: boolean,
    module: string
}

const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: "#fb44c0",
        '&:hover': {
            backgroundColor: alpha("#fb44c0",theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: "#fb44c0",
    },
}));

function App() {

    const [resources, setResources] = useState([] as Resource[])
    const [resourcesFetched, setResourcesFetched] = useState(false)
    const [queryParams, setQueryParams] = useState({admin: false});

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
            setResourcesFetched(true)
        }

        if (!resourcesFetched) {
            fetchData()
            setResourcesFetched(true)
        }

        const params = new URLSearchParams(window.location.search);

        const queryParamsObject: {admin: boolean} = {
            admin: !!params.get("admin")
        };

        setQueryParams(queryParamsObject);
    }, [resourcesFetched])

    async function handleToggle(id: string, e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.checked
        return await resourceService.patchResource(id, val)
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
                        {(queryParams["admin"]) &&
                            <PinkSwitch
                                edge="end"
                                color={"error"}
                                onChange={(e) => handleToggle(resource._id, e)}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-wifi',
                                }}
                            />
                        }
                    </ListItem>
                </>
            )
        })
    }

    const moduleList = Object.keys(mapResources()).map((moduleName: string) => {
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
                {(resourcesFetched && resources.length === 0) ? <Typography variant={"h2"}>No resources found.</Typography> : moduleList}
                {moduleList}
            </header>
            <img src={logo} style={{position: "fixed", top: "4em", right: "4em", width: "450px", borderRadius: "15px"}}/>
        </div>
    );
}

export default App;
