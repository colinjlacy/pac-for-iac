package delete_prevention

import future.keywords.in
import future.keywords.if
import future.keywords.contains

reject[msg] {
    resource := input.resource_changes[_]
    some i, "delete" in resource.change.actions
    i > -1
    msg = sprintf(
        "resource `%s` is set to be deleted, which is not allowed",
        [resource.address]
    )
}