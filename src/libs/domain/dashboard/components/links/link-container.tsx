'use client'

import { useState } from "react"
import { LinkList } from "./link-list"
import { Accounts } from "../accounts/accounts"

export const LinkContainer = () => {
    const [showAccount, setShowAccount] = useState(false)
    const [linkId, setLinkId] = useState("")

    const handleShowAccount = (link_id: string) => {
        setShowAccount(!showAccount)
        setLinkId(link_id)
    }

    const handleBack = () => {
        setShowAccount(!showAccount)
    }

    return (
        <>
            {!showAccount ?
                <LinkList handleShowAccount={handleShowAccount} />
                :
                <Accounts linkId={linkId} handleBack={handleBack} />
            }
        </>
    )
}