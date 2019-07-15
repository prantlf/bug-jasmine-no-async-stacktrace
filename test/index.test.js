function crash () {
  throw new Error('Crashing...')
}

describe('answerEverything', function () {
  beforeAll(function () {
    var element = document.body
    window.answerEverything(element)
    this.answer = element.textContent
  })

  it('answers', function () {
    expect(typeof this.answer === 'string' || this.answer instanceof String).toBeTruthy()
    crash()
  })

  it('answers understandably', function (done) {
    setTimeout(function () {
      expect(this.answer).toMatch(/\d+/)
      crash()
      done()
    }.bind(this))
  })
})
