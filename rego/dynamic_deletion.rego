package dynamic_deletion

import future.keywords.in
import future.keywords.if
import future.keywords.contains
import future.keywords.every

send_http_request(url) = http.send({
    "url": url,
    "method": "GET"
})

ok_to_delete := addresses if {
    res := send_http_request("http://localhost:8084/resources")
    state_resources := res.body.resources
    # this complex statement, if written in Python, would look like...
    # addresses = [resource.address for resource in state_resources if resource.allowDelete == True]
    addresses := [address | state_resources[i].allowDelete == true; address := state_resources[i].address]
}

planned_deletions[resources] {
	resource := input.resource_changes[_]
    some i, "delete" in resource.change.actions
    resources = resource
}

reject[msg] {
	addresses := planned_deletions[_].address
	not addresses in ok_to_delete
	msg = sprintf("resource `%s` is set to be deleted, which is not allowed", [addresses])
}