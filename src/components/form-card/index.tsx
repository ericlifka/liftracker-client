import type {ChangeEvent, FormEvent, FunctionComponent, MouseEvent} from 'react'
import React from 'react'
import {Link} from 'react-router-dom'
import {useCallback} from 'react'
import './style.less'

const createId = (label: string) => label.split(' ').join('').toLowerCase()

export type FormCardProps = {
  className?: string
  onSubmit: (e: FormEvent) => void
}
export const FormCard: FunctionComponent<FormCardProps> = (props) => {
  let {
    className = '',
    onSubmit, children
  } = props

  const submitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(e)
  }, [onSubmit])

  return (
    <form
      className={`form-card ${className}`}
      onSubmit={submitHandler}
    >
      {children}
    </form>
  )
}

export type FormErrorProps = {
  className?: string
}
export const FormError: FunctionComponent<FormErrorProps> = (props) => {
  let {
    className = '',
    children
  } = props

  return <div className={`form-error ${className}`}>{children}</div>
}

export type FormInputProps = {
  id?: string
  type?: string
  className?: string
  placeholder?: string
  label?: string
  value: string
  setValue: (s: string) => void
}
export const FormInput: FunctionComponent<FormInputProps> = (props) => {
  let {
    type = "text",
    className = '',
    placeholder, label, value, setValue
  } = props
  let id = props.id || createId(label || placeholder || '')

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [setValue])

  return (
    <div className={`form-input ${className}`}>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
        />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  )
}

export type FormActionsProps = {
  className?: string
}
export const FormActions: FunctionComponent<FormActionsProps> = (props) => {
  let {
    className = '',
    children
  } = props

  return <div className={`form-actions ${className}`}>{children}</div>
}

export type FormButtonProps = {
  type?: "button" | "submit" | "reset"
  className?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}
export const FormButton: FunctionComponent<FormButtonProps> = (props) => {
  let {
    type = "button",
    className = '',
    children, onClick
  } = props

  return (
    <button
      className={`form-button ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export type FormLinkProps = {
  to: string
  className?: string
}
export const FormLink: FunctionComponent<FormLinkProps> = (props) => {
  let {
    className = '',
    to, children
  } = props

  return <Link to={to} className={`form-link ${className}`}>{children}</Link>
}
